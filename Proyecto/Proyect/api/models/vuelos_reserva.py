# models/vuelos_reserva.py
from sqlalchemy import Column, Integer, ForeignKey
from config.db import Base


class VueloReserva(Base):
    __tablename__ = "vuelos_reservas"

    VueloID = Column(Integer, ForeignKey("vuelos.VueloID"),
                     primary_key=True, index=True)
    ReservaID = Column(Integer, ForeignKey(
        "reservas.ReservaID"), primary_key=True, index=True)
