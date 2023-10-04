from fastapi import FastAPI
from Routes.AccountRoute import router as AccountRouter
from fastapi.middleware.cors import CORSMiddleware

# FastAPI instance
app = FastAPI()

# Add origins
origins = [
    "http://localhost:7197",
    # Agrega aquí otras URLs permitidas si es necesario
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
app.include_router(AccountRouter, tags=["accounts"], prefix="/api/v1")

# Root route
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}


