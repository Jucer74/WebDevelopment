# models/destinos_reserva.py
from sqlalchemy import Column, Integer, ForeignKey
from config.db import Base


class DestinoReserva(Base):
    __tablename__ = "destinos_reservas"

    DestinoID = Column(Integer, ForeignKey(
        "destinos.DestinoID"), primary_key=True, index=True)
    ReservaID = Column(Integer, ForeignKey(
        "reservas.ReservaID"), primary_key=True, index=True)
