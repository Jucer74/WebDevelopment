from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from routes import usuario
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
app.include_router(usuario.router, prefix="/api")

load_dotenv()

# Accede a las variables de entorno con os.environ.get("NOMBRE_VARIABLE")
database_url = os.environ.get(
    "DATABASE_URL", "mysql+pymysql://root:Un1c0rn10@localhost:3306/Soundsanti")
