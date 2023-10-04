from fastapi import FastAPI
from typing import Union
from Routes.Routes import user

app = FastAPI()

app.include_router(user)
