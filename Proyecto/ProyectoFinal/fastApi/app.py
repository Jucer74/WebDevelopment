from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes.user import user
from routes.transaction import transaction

app = FastAPI(
    title="Users API",
    description="Operations with users",
    version="0.1.0",
)

origin = {
    'http://localhost:3000'
}

# Configuración del middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user, prefix="/api")
app.include_router(transaction, prefix="/api")

load_dotenv()

# Configuración de certificados SSL
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000,
                ssl_keyfile="key.pem", ssl_certfile="cert.pem")
