# schemas/destino.py
from pydantic import BaseModel

class DestinoBase(BaseModel):
    NombreDestino: str
    DescripcionDestino: str
    ImagenesDestino: str

class DestinoCreate(DestinoBase):
    pass

class Destino(DestinoBase):
    DestinoID: int

    class Config:
        orm_mode = True
