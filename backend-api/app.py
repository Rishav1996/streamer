from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pykafka import KafkaClient

import database_models
from api_models import UserModel, LikesModel, PostsModel, SharesModel, CommentsModel
import json
import datetime

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


kafka_client = KafkaClient(hosts='127.0.0.1:9092', zookeeper_hosts='127.0.0.1:2181')

login_raw = kafka_client.topics['login_raw']
likes_raw = kafka_client.topics['likes_raw']
posts_raw = kafka_client.topics['posts_raw']
comments_raw = kafka_client.topics['comments_raw']
shares_raw = kafka_client.topics['shares_raw']

login_raw_producer = login_raw.get_producer()
likes_raw_producer = likes_raw.get_producer()
posts_raw_producer = posts_raw.get_producer()
comments_raw_producer = comments_raw.get_producer()
shares_raw_producer = shares_raw.get_producer()


def json_to_bytes(data):
    return bytes(json.dumps(data), 'utf-8')


@app.post('/login')
async def login(login_modal: UserModel):
    data = {'u_id': login_modal.u_id, 'u_active': 1}
    data = json_to_bytes(data)
    login_raw_producer.produce(data)
    return {'message': "OK"}


@app.post('/logout')
async def logout(login_modal: UserModel):
    data = {'u_id': login_modal.u_id, 'u_active': 0}
    data = json_to_bytes(data)
    login_raw_producer.produce(data)
    return {'message': "OK"}


@app.post('/like')
async def like(like_modal: LikesModel):
    data = {'p_id': like_modal.p_id, 'u_id': like_modal.u_id, 'l_timestamp': str(datetime.datetime.now())}
    data = json_to_bytes(data)
    likes_raw_producer.produce(data)
    return {'message': "OK"}


@app.post('/post')
async def post(post_modal: PostsModel):
    data = {'p_text': post_modal.p_text, 'p_timestamp': str(datetime.datetime.now()),
            'u_id': post_modal.u_id, 'p_type': post_modal.p_type}
    data = json_to_bytes(data)
    posts_raw_producer.produce(data)
    return {'message': "OK"}


@app.post('/post/fetch')
async def post_fetch(user_model: UserModel):
    data = database_models.post_fetching(user_model.u_name)
    return data


@app.post('/group/fetch')
async def group_fetch(user_model: UserModel):
    data = database_models.group_fetching(user_model.u_name)
    return data


@app.post('/comment')
async def comment(comment_modal: CommentsModel):
    data = {'p_id': comment_modal.p_id, 'c_text': comment_modal.c_text,
            'c_timestamp': str(datetime.datetime.now()), 'u_id': comment_modal.u_id}
    data = json_to_bytes(data)
    comments_raw_producer.produce(data)
    return {'message': "OK"}


@app.post('/share')
async def share(share_modal: SharesModel):
    data = {'p_id': share_modal.p_id, 'u_id': share_modal.u_id, 's_timestamp': str(datetime.datetime.now())}
    data = json_to_bytes(data)
    shares_raw_producer.produce(data)
    return {'message': "OK"}
