from pydantic import BaseModel
from typing import Optional


class UserModel(BaseModel):
    u_id: Optional[int] = None
    u_name: Optional[str] = None
    u_password: Optional[str] = None
    u_active: Optional[int] = None
    g_id: Optional[int] = None


class LikesModel(BaseModel):
    p_id: Optional[int] = None
    u_id: Optional[int] = None
    l_timestamp: Optional[str] = None


class SharesModel(BaseModel):
    p_id: Optional[int] = None
    u_id: Optional[int] = None
    s_timestamp: Optional[str] = None


class CommentsModel(BaseModel):
    p_id: Optional[int] = None
    u_id: Optional[int] = None
    c_timestamp: Optional[str] = None
    c_text: Optional[str] = None


class PostsModel(BaseModel):
    p_id: Optional[int] = None
    p_timestamp: Optional[str] = None
    p_text: Optional[str] = None
    p_localaddress: Optional[int] = None
    u_id: Optional[int] = None
    p_type: Optional[str] = None
    p_emotion: Optional[str] = None
