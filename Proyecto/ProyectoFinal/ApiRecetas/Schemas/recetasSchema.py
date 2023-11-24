# user_schemas.py
from pydantic import BaseModel

class recetasSchema(BaseModel):
    titulo: str
    descripcion: str

