from pyspark.sql import SparkSession
from pyspark.sql.functions import udf
from pyspark.sql.types import *
import json
import mysql.connector
import datetime
import text2emotion as te


HOST = 'localhost'
DATABASE = 'stream_analytics'
USERNAME = 'root'
PASSWORD = '1234'
PORT = 3306

JDBC_URL = f'jdbc:mysql://{HOST}:{PORT}/{DATABASE}'
JDBC_DRIVER = "com.mysql.jdbc.Driver"


def spark_connection():
    spark = SparkSession.builder.config("spark.jars", "E:\\Workspace\\Streamer\\pyspark-kafka\\mysql-connector-java-8.0.26.jar")\
        .master("local[1]")\
        .appName('streamer-app')\
        .getOrCreate()
    sc = spark.sparkContext
    return sc, spark


def database_connection():
    global HOST, DATABASE, PORT, USERNAME, PASSWORD
    connection = mysql.connector.connect(host=HOST,
                                         port=PORT,
                                         database=DATABASE,
                                         user=USERNAME,
                                         password=PASSWORD)
    cursor = connection.cursor()
    return connection, cursor


def json_to_bytes(data):
    return bytes(json.dumps(data), 'utf-8')


def login_aggregation(data, producer):
    sc, _ = spark_connection()
    rdd = sc.parallelize(data)
    df = rdd.toDF(['u_id', 'u_active'])

    def update_rows(x):
        conn, curr = database_connection()
        curr.execute(f'update users set u_active = {x["u_active"]} where u_id = {x["u_id"]}')
        conn.commit()
        if conn.is_connected():
            conn.close()
        return x

    results = df.rdd.map(lambda x: update_rows(x)).toDF(['u_id', 'u_active'])
    active_users = results.groupby().sum('u_active').toPandas().values[0][0]
    data = {'active_users': str(active_users), 'timestamp': str(datetime.datetime.now())}
    data = json_to_bytes({'tag': 'logins', 'data': data})
    producer.produce(data)
    sc.stop()


def likes_aggregation(data, producer):
    global DATABASE, HOST, USERNAME, PASSWORD, JDBC_URL, JDBC_DRIVER
    sc, spark = spark_connection()
    rdd = sc.parallelize(data)
    df = rdd.toDF(['p_id', 'u_id', 'l_timestamp'])
    df.write.format('jdbc').options(
        url=JDBC_URL,
        driver=JDBC_DRIVER,
        dbtable='likes',
        user=USERNAME,
        password=PASSWORD).mode('append').save()
    counts = df.toPandas().shape[0]
    data = {'no_of_likes': str(counts), 'timestamp': str(datetime.datetime.now())}
    data = json_to_bytes({'tag': 'likes', 'data': data})
    producer.produce(data)
    sc.stop()


def shares_aggregation(data, producer):
    global DATABASE, HOST, USERNAME, PASSWORD, JDBC_URL, JDBC_DRIVER
    sc, spark = spark_connection()
    rdd = sc.parallelize(data)
    df = rdd.toDF(['p_id', 'u_id', 's_timestamp'])
    df.write.format('jdbc').options(
        url=JDBC_URL,
        driver=JDBC_DRIVER,
        dbtable='shares',
        user=USERNAME,
        password=PASSWORD).mode('append').save()
    counts = df.toPandas().shape[0]
    data = {'no_of_shares': str(counts), 'timestamp': str(datetime.datetime.now())}
    data = json_to_bytes({'tag': 'shares', 'data': data})
    producer.produce(data)
    sc.stop()


def comments_aggregation(data, producer):
    global DATABASE, HOST, USERNAME, PASSWORD, JDBC_URL, JDBC_DRIVER
    sc, spark = spark_connection()
    rdd = sc.parallelize(data)
    df = rdd.toDF(['p_id', 'c_text', 'c_timestamp', 'u_id'])
    df.write.format('jdbc').options(
        url=JDBC_URL,
        driver=JDBC_DRIVER,
        dbtable='comments',
        user=USERNAME,
        password=PASSWORD).mode('append').save()
    counts = df.toPandas().shape[0]
    data = {'no_of_comments': str(counts), 'timestamp': str(datetime.datetime.now())}
    data = json_to_bytes({'tag': 'comments', 'data': data})
    producer.produce(data)
    sc.stop()


def posts_aggregation(data, producer):
    global DATABASE, HOST, USERNAME, PASSWORD, JDBC_URL, JDBC_DRIVER
    sc, spark = spark_connection()
    rdd = sc.parallelize(data)
    df = rdd.toDF(['p_text', 'p_timestamp', 'u_id', 'p_type'])
    counts = df.toPandas().shape[0]
    data = {'no_of_posts': str(counts), 'timestamp': str(datetime.datetime.now())}
    data = json_to_bytes({'tag': 'posts', 'data': data})
    producer.produce(data)

    def convert_to_emotion(x):
        emotion = te.get_emotion(x)
        val = max(emotion, key=emotion.get)
        return val

    lambda_emotion = udf(lambda x: convert_to_emotion(x), StringType())
    df = df.withColumn('p_emotion', lambda_emotion(df.p_text))
    df.write.format('jdbc').options(
        url=JDBC_URL,
        driver=JDBC_DRIVER,
        dbtable='posts',
        user=USERNAME,
        password=PASSWORD).mode('append').save()
    sc.stop()


def text_to_emotion(producer):
    global DATABASE, HOST, USERNAME, PASSWORD, JDBC_URL, JDBC_DRIVER
    sc, spark = spark_connection()
    rdd = spark.read.format("jdbc").option("url", JDBC_URL)\
        .option("driver", JDBC_DRIVER).option("dbtable", "posts") \
        .option("user", USERNAME).option("password", PASSWORD).load()
    df = rdd.toDF('p_id', 'p_timestamp', 'p_text', 'p_localaddress', 'u_id', 'p_type', 'p_emotion')
    df = df.select('p_id', 'p_emotion').groupBy("p_emotion").count().toPandas().to_dict(orient='rows')
    df = [{j: str(d[j]) for j in d.keys()} for d in df]
    data = json_to_bytes({'tag': 'emotions', 'data': df})
    producer.produce(data)
    sc.stop()
