# schemas/reserva.py
from pydantic import BaseModel
from datetime import date

class ReservaBase(BaseModel):
    FechaReserva: date
    NumeroPersonas: int

class ReservaCreate(ReservaBase):
    UsuarioID: int

class Reserva(ReservaBase):
    ReservaID: int

    class Config:
        orm_mode = True
