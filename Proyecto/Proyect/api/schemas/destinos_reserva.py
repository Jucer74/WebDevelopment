# schemas/destinos_reserva.py
from pydantic import BaseModel

class DestinoReservaBase(BaseModel):
    DestinoID: int
    ReservaID: int

class DestinoReservaCreate(DestinoReservaBase):
    pass

class DestinoReserva(DestinoReservaBase):
    class Config:
        orm_mode = True
