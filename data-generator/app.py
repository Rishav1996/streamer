import pandas as pd
import urllib3
import random
import time
import json

http = urllib3.PoolManager()

BASE_URL = 'http://localhost:8000'
URLS_LOGINS = BASE_URL + '/login'
URLS_LOGOUTS = BASE_URL + '/logout'
URLS_LIKE = BASE_URL + '/like'
URLS_POST = BASE_URL + '/post'
URLS_COMMENT = BASE_URL + '/comment'
URLS_SHARE = BASE_URL + '/share'

dataset = pd.read_csv('data/dataset.csv')


def json_to_bytes(data):
    return bytes(json.dumps(data), 'utf-8')


def logins():
    global http, URLS_LOGINS, URLS_LOGOUTS
    if random.randint(0, 10) % 2:
        u_id = random.randint(1, 100)
        resp = http.request("POST", URLS_LOGINS, body=json_to_bytes({"u_id": u_id}))
    else:
        u_id = random.randint(1, 100)
        resp = http.request("POST", URLS_LOGOUTS, body=json_to_bytes({"u_id": u_id}))


def posts():
    global http, URLS_POST
    u_id = str(random.randint(1, 100))
    p_text = str(dataset.iloc[random.randint(0, dataset.shape[0]), 0]).strip()
    p_type = 'text'
    resp = http.request("POST", URLS_POST, body=json_to_bytes({"u_id": u_id, "p_text": p_text, "p_type": p_type}))


def likes():
    global http, URLS_LIKE
    u_id = str(random.randint(1, 100))
    p_id = str(random.randint(1, 100))
    resp = http.request("POST", URLS_LIKE, body=json_to_bytes({"u_id": u_id, "p_id": p_id}))


def comments():
    global http, URLS_COMMENT
    u_id = str(random.randint(1, 100))
    c_text = str(dataset.iloc[random.randint(0, dataset.shape[0]), 0]).strip()
    p_id = str(random.randint(1, 100))
    resp = http.request("POST", URLS_COMMENT, body=json_to_bytes({"u_id": u_id, "c_text": c_text, "p_id": p_id}))


def shares():
    global http, URLS_SHARE
    u_id = str(random.randint(1, 100))
    p_id = str(random.randint(1, 100))
    resp = http.request("POST", URLS_SHARE, body=json_to_bytes({"u_id": u_id, "p_id": p_id}))


if __name__ == '__main__':
    while True:
        try:
            for i in range(random.randint(20, 30)):
                logins()
            for i in range(random.randint(20, 30)):
                posts()
            for i in range(random.randint(20, 30)):
                likes()
            for i in range(random.randint(20, 30)):
                comments()
            for i in range(random.randint(20, 30)):
                shares()
            time.sleep(30)
        except Exception as e:
            print(e)
            http = urllib3.PoolManager()
            time.sleep(10)
