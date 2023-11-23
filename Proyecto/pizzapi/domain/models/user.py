from pydantic import BaseModel, EmailStr
from typing import List 
from .order import Order


class UserBase(BaseModel):
    email: EmailStr
    name: str
    last_name: str
    phone: str | None


class UserCreate(UserBase):
    password: str


class User(UserBase):
    # id: int
    orders: List[Order] = []
    is_active: bool = True
    orders: List[Order] = []

    class Config:
        #orm_mode = True
        from_attributes = True


class UserLogin(BaseModel):
    email: str
    password: str

# class UserInDB(BaseModel):
    # email: str

class Token(BaseModel):
    access_token: str
    token_type: str