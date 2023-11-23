# schemas/vuelo.py
from pydantic import BaseModel

class VueloBase(BaseModel):
    Aerolinea: str
    RutaHorario: str
    Precio: float
    DisponibilidadAsientos: int

class VueloCreate(VueloBase):
    pass

class Vuelo(VueloBase):
    VueloID: int

    class Config:
        orm_mode = True
