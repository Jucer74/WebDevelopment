# models/destino.py
from sqlalchemy import Column, Integer, String, Text
from config.db import Base
from sqlalchemy.orm import relationship


class Destino(Base):
    __tablename__ = "destinos"

    DestinoID = Column(Integer, primary_key=True, index=True)
    NombreDestino = Column(String(100), index=True)
    DescripcionDestino = Column(Text)
    ImagenesDestino = Column(Text)
    # Agrega esta línea para establecer la relación con Reserva
    reservas = relationship(
        "Reserva", secondary="destinos_reservas", back_populates="destinos")
