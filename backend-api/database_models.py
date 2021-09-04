import mysql.connector
import pandas as pd


def create_connection():
    connection = mysql.connector.connect(host='localhost',
                                         port=3306,
                                         database='stream_analytics',
                                         user='root',
                                         password='1234')
    cursor = connection.cursor()
    return connection, cursor


def group_fetching(u_name):
    conn, curr = create_connection()
    query = f'''select g.g_name
    from users as u
    inner join user_group_relation as ugr on u.u_id = ugr.u_id 
    inner join stream_analytics.groups as g on g.g_id = ugr.g_id where u.u_name = "{u_name}"'''
    curr.execute(query)
    result = [i[0] for i in curr.fetchall()]
    if conn.is_connected():
        conn.close()
    return {'groups': result}


def post_fetching(u_name):
    conn, curr = create_connection()
    query = f'''select p.p_id as post_id, p.p_timestamp as time_st, p.p_text as post_text, 
    count(l.p_id) as likes, count(c.p_id) as comments, count(s.p_id) as shares
    from posts p 
    join users u on (p.u_id=u.u_id)
    left join likes l on (p.p_id=l.p_id)
    left join comments c on (c.p_id=l.p_id)
    left join shares s on (s.p_id=l.p_id)
    where p.p_type = "text" and u.u_name = "{u_name}"
    group by p.p_id'''
    curr.execute(query)
    result = pd.DataFrame(curr.fetchall(), columns=['post_id', 'time_st', 'post_text', 'likes', 'comments', 'shares'])
    if conn.is_connected():
        conn.close()
    return result.to_dict(orient='rows')
