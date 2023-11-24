from pydantic import BaseModel
from datetime import date
from typing import Optional


class UsuarioBase(BaseModel):
    Nombre: str
    Apellido: str
    Genero: str
    Correo: str
    Contraseña: str
    Fecha_Nacimiento: Optional[date]


class UsuarioCreate(UsuarioBase):
    pass


class UsuarioLogin(BaseModel):
    Correo: str
    Contraseña: str


class Usuario(UsuarioBase):
    ID: int

    class Config:
        orm_mode = True
