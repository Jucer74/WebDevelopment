from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes import usuarios, destinos, vuelos, reservas, destinos_reservas, vuelos_reservas
import os

app = FastAPI()

origin = {
    'http://localhost:3000'
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
app.include_router(usuarios.router, prefix="/api")
app.include_router(destinos.router, prefix="/api", tags=["destinos"])
app.include_router(vuelos.router, prefix="/api", tags=["vuelos"])
app.include_router(reservas.router, prefix="/api", tags=["reservas"])
app.include_router(destinos_reservas.router, prefix="/api",
                   tags=["destinos_reservas"])
app.include_router(vuelos_reservas.router, prefix="/api",
                   tags=["vuelos_reservas"])

load_dotenv()

# Accede a las variables de entorno con os.environ.get("NOMBRE_VARIABLE")
database_url = os.environ.get(
    "DATABASE_URL", "mysql+pymysql://root:geometrydash2.0@localhost:3306/AgenciaViajes")
