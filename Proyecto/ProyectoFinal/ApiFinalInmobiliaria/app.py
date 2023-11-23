from fastapi import FastAPI
from typing import Union
from fastapi import FastAPI
from Routes.accountsRoute import router as AccountsRouter
from Routes.recetas import router as recetas
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
    allow_origins=["http://localhost:3000"],  # Agrega aquí el origen de tu aplicación React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(recetas, tags=["Recetas"], prefix="/api/v1")

# Root route
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to this fantastic app!"}

