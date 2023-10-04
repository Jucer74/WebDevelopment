from fastapi import APIRouter
from Schemas.user_schema import UserSchema

user = APIRouter()

@user.get("/")
def root():
    return {"message":"hola"}

@user.post("/api/user")
def create_user(data_user: UserSchema):
    print(data_user)

@user.put("/api/user")
def update_user():
    pass