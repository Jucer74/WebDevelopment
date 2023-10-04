from fastapi import FastAPI
from Routes.accountsRouter import router as accountsRouter
from fastapi.middleware.cors import CORSMiddleware

# FastAPI instance
app = FastAPI()

# Add origins
origins = [
    "http://localhost:8000",
]

# Add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Include routers
app.include_router(accountsRouter, tags=["Accounts"], prefix="/api/v1")

# Root route
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}