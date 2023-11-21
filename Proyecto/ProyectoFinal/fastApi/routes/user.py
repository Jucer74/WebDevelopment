from fastapi import APIRouter, HTTPException
from config.db import conn
from models.user import users
from schemas.user import User, CreateUser, UpdateUser, LoginUser

user = APIRouter()


@user.post("/users", response_model=User, tags=["user"])
def create_user(user: CreateUser):

    last_id_query = users.select().order_by(users.c.id.desc()).limit(1)
    last_id = conn.execute(last_id_query).scalar()

    new_id = last_id + 1 if last_id is not None else 1

    query = users.insert().values(id=new_id, **user.dict())
    conn.execute(query)

    return {"id": new_id, **user.dict()}


@user.get("/users/{user_id}", response_model=User, tags=["user"])
def read_user(user_id: int):
    query = users.select().where(users.c.id == user_id)
    user = conn.execute(query).first()
    if user:
        return dict(user)
    raise HTTPException(status_code=404, detail="User not found")


@user.get("/users", response_model=list[User], tags=["user"])
def read_users(skip: int = 0, limit: int = 10):
    query = users.select().offset(skip).limit(limit)
    result = conn.execute(query)
    return result.fetchall()


@user.put("/users/{user_id}", response_model=User, tags=["user"])
def update_user(user_id: int, updated_user: UpdateUser):

    update_data = {key: value for key, value in updated_user.dict(exclude_unset=True).items(
    ) if key in ["name", "email", "password", "username", "address", "city", "balance", "account_type"]}

    query = users.update().where(users.c.id == user_id).values(**update_data)
    conn.execute(query)
    return {**update_data, "id": user_id}


@user.delete("/users/{user_id}", response_model=dict, tags=["user"])
def delete_user(user_id: int):

    stored_user = conn.execute(
        users.select().where(users.c.id == user_id)).first()
    if not stored_user:
        raise HTTPException(status_code=404, detail="User not found")

    query = users.delete().where(users.c.id == user_id)
    conn.execute(query)

    update_query = users.update().where(
        users.c.id > user_id).values(id=users.c.id - 1)
    conn.execute(update_query)

    return {"message": "User deleted successfully"}


@user.post("/signup", response_model=User, tags=["register"])
def signup(user: CreateUser):

    existing_user = conn.execute(users.select().where(
        users.c.username == user.username)).first()
    if existing_user:
        raise HTTPException(
            status_code=400, detail="Username already registered")

    last_id_query = users.select().order_by(users.c.id.desc()).limit(1)
    last_id = conn.execute(last_id_query).scalar()

    new_id = last_id + 1 if last_id is not None else 1

    query = users.insert().values(id=new_id, **user.dict())
    user_id = conn.execute(query).inserted_primary_key[0]

    return {
        "id": user_id,
        **user.dict(),
    }


@user.post("/login", response_model=User, tags=["login"])
def login(user: LoginUser):

    stored_user = conn.execute(users.select().where(
        users.c.username == user.username)).first()

    if stored_user and stored_user.password == user.password:

        return {
            "id": stored_user.id,
            "name": stored_user.name,
            "email": stored_user.email,
            "username": stored_user.username,
            "password": ""
        }

    raise HTTPException(status_code=401, detail="Invalid credentials")
