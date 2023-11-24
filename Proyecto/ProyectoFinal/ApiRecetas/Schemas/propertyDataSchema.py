# property_schemas.py
from pydantic import BaseModel

class PropertySchema(BaseModel):
    id_inmueble: int
    precio: float
    num_habitaciones: int
    barrio: str
    metros_cuadrados: int
    num_banos: int
    titulo: str
    creado_por: int