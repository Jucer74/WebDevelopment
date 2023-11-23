from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Users(Base):
    __tablename__ = "usuarios"

    id_usuario = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre_usuario = Column(String(50))
    correo_electronico = Column(String(100))
    contrasena = Column(String(255))




