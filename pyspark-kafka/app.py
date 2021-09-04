import faust
from pykafka import KafkaClient

import process_message

kafka_client = KafkaClient(hosts='127.0.0.1:9092', zookeeper_hosts='127.0.0.1:2181')

login_processed = kafka_client.topics['login_processed']
likes_processed = kafka_client.topics['likes_processed']
posts_processed = kafka_client.topics['posts_processed']
comments_processed = kafka_client.topics['comments_processed']
shares_processed = kafka_client.topics['shares_processed']
emotion_processed = kafka_client.topics['emotion_processed']

login_processed_producer = login_processed.get_producer()
likes_processed_producer = likes_processed.get_producer()
posts_processed_producer = posts_processed.get_producer()
comments_processed_producer = comments_processed.get_producer()
shares_processed_producer = shares_processed.get_producer()
emotion_processed_producer = emotion_processed.get_producer()

app = faust.App('streamer', broker='kafka://localhost:9092', value_serializer='json', store='rocksdb://')

login_raw_topic = app.topic('login_raw')
likes_raw_topic = app.topic('likes_raw')
posts_raw_topic = app.topic('posts_raw')
comments_raw_topic = app.topic('comments_raw')
shares_raw_topic = app.topic('shares_raw')

login_data = []
likes_data = []
posts_data = []
comments_data = []
shares_data = []


@app.agent(login_raw_topic)
async def login_raw_data(vals):
    async for val in vals:
        login_data.append((val['u_id'], val['u_active']))


@app.agent(likes_raw_topic)
async def likes_raw_data(vals):
    async for val in vals:
        likes_data.append((val['p_id'], val['u_id'], val['l_timestamp']))


@app.agent(posts_raw_topic)
async def posts_raw_data(vals):
    async for val in vals:
        posts_data.append((val['p_text'], val['p_timestamp'], val['u_id'], val['p_type']))


@app.agent(comments_raw_topic)
async def comments_raw_data(vals):
    async for val in vals:
        comments_data.append((val['p_id'], val['c_text'], val['c_timestamp'], val['u_id']))


@app.agent(shares_raw_topic)
async def shares_raw_data(vals):
    async for val in vals:
        shares_data.append((val['p_id'], val['u_id'], val['s_timestamp']))


@app.timer(30)
async def all_logins():
    global login_data
    try:
        if len(login_data) > 0:
            process_message.login_aggregation(login_data, login_processed_producer)

        login_data = []
    except Exception as e:
        print(e)
    finally:
        login_data = []


@app.timer(30)
async def all_likes():
    global likes_data
    try:
        if len(likes_data) > 0:
            process_message.likes_aggregation(likes_data, likes_processed_producer)

        likes_data = []
    except Exception as e:
        print(e)
    finally:
        likes_data = []


@app.timer(30)
async def all_comments():
    global comments_data
    try:
        if len(comments_data) > 0:
            process_message.comments_aggregation(comments_data, comments_processed_producer)

        comments_data = []
    except Exception as e:
        print(e)
    finally:
        comments_data = []


@app.timer(30)
async def all_shares():
    global shares_data
    try:
        if len(shares_data) > 0:
            process_message.shares_aggregation(shares_data, shares_processed_producer)

        shares_data = []
    except Exception as e:
        print(e)
    finally:
        shares_data = []


@app.timer(30)
async def all_posts():
    global posts_data
    try:
        if len(posts_data) > 0:
            process_message.posts_aggregation(posts_data, posts_processed_producer)

        posts_data = []
    except Exception as e:
        print(e)
    finally:
        posts_data = []


@app.timer(30)
async def overall_process():
    try:
        process_message.text_to_emotion(emotion_processed_producer)

    except Exception as e:
        print(e)
    finally:
        pass
