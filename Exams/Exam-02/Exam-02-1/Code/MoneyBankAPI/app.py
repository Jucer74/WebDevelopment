from fastapi import FastAPI
from Routes.accountsRouter import router as AccountRouter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(AccountRouter, tags=["Accounts"], prefix="/api/v1")

@app.get("/")
def read_root():
    return {"Hello": "World"} 