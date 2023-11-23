# schemas/vuelos_reserva.py
from pydantic import BaseModel


class VueloReservaBase(BaseModel):
    VueloID: int
    ReservaID: int


class VueloReservaCreate(VueloReservaBase):
    pass


class VueloReserva(VueloReservaBase):
    class Config:
        orm_mode = True
