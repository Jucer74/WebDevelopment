from sqlalchemy import Column, Integer, String, Date
from config.db import Base


class usuario(Base):
    __tablename__ = 'usuario'

    ID = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String(50), index=(True))
    Apellido = Column(String(50), index=(True))
    Genero = Column(String(10), index=(True))
    Correo = Column(String(100), index=(True))
    Contraseña = Column(String(100), index=(True))
    Fecha_Nacimiento = Column(Date)
