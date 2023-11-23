# models/vuelo.py
from sqlalchemy import Column, Integer, String, DECIMAL
from config.db import Base
from sqlalchemy.orm import relationship


class Vuelo(Base):
    __tablename__ = "vuelos"

    VueloID = Column(Integer, primary_key=True, index=True)
    Aerolinea = Column(String(100), index=True)
    RutaHorario = Column(String(200))
    Precio = Column(DECIMAL(10, 2))
    DisponibilidadAsientos = Column(Integer)
 # Agrega esta línea para establecer la relación con Reserva
    reservas = relationship(
        "Reserva", secondary="vuelos_reservas", back_populates="vuelos")
