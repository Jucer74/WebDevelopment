# models/reserva.py
from sqlalchemy import Column, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from config.db import Base

class Reserva(Base):
    __tablename__ = "reservas"

    ReservaID = Column(Integer, primary_key=True, index=True)
    FechaReserva = Column(Date)
    NumeroPersonas = Column(Integer)

    UsuarioID = Column(Integer, ForeignKey("usuarios.UsuarioID"))
    usuario = relationship("Usuario", back_populates="reservas")

    destinos = relationship("Destino", secondary="destinos_reservas", back_populates="reservas")
    vuelos = relationship("Vuelo", secondary="vuelos_reservas", back_populates="reservas")
