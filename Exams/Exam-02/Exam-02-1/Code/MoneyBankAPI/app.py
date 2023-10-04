from fastapi import FastAPI
from Routes.accountRoute import router as AccountRouter
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["https://localhost:8000", "http://localhost:8000"]

# middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
    allow_credentials=True
)

app.include_router(AccountRouter, tags=["Accounts"], prefix="/api/v1")

# Root path
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to MoneyBank API, please go to /docs to see the documentation and try the API :)"}