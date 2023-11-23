from sqlalchemy import Column, Integer, String
from config.db import Base
from sqlalchemy.orm import relationship


class Usuario(Base):
    __tablename__ = "usuarios"

    UsuarioID = Column(Integer, primary_key=True, index=True)
    Nombre = Column(String(50), index=True)
    CorreoElectronico = Column(String(100), index=True)
    Contrasena = Column(String(100))
    # Agrega esta línea para establecer la relación con Reserva
    reservas = relationship("Reserva", back_populates="usuario")
