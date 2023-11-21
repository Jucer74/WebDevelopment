from infrastructure.database.db import Base, engine
from presentation.routes.user_route import router as user_router
from fastapi import FastAPI


Base.metadata.create_all(bind=engine) # lo mismo que create_tables()

app = FastAPI()

app.include_router(user_router)

@app.get("/")
def read_root():
    return {"Hello": "Pizza API"}




