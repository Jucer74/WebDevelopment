from sqlalchemy import Column, Integer, String
from config.db import Base


class Usuario(Base):
    __tablename__ = "usuarios"

    UsuarioID = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String(50), index=True)
    CorreoElectronico = Column(String(100), index=True)
    Contrasena = Column(String(100))
