# user_schemas.py
from pydantic import BaseModel

class UsersSchemas(BaseModel):
    nombre_usuario: str
    correo_electronico: str
    contrasena: str
