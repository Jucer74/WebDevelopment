
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes.product import router as product
from routes.user import router as user
import os

app = FastAPI()

origin = {
    'http://localhost:3000',
}

# Configuración del middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,  # O ajusta esto según tu configuración
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(user, prefix="/api", tags=["usuario"])
app.include_router(product, prefix="/api", tags=["producto"])

load_dotenv()

# Accede a las variables de entorno con os.environ.get("NOMBRE_VARIABLE")
database_url = os.environ.get(
    "DATABASE_URL", "mysql+pymysql://root:geometrydash2.0@localhost:3306/Tienda")
