# routes/vuelos_reservas.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.vuelos_reserva import VueloReservaCreate, VueloReserva
from models.vuelos_reserva import VueloReserva as VueloReservaModel
from config.db import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/asociar_vuelo_reserva/", response_model=VueloReserva)
def asociar_vuelo_reserva(vuelo_reserva: VueloReservaCreate, db: Session = Depends(get_db)):
    db_vuelo_reserva = VueloReservaModel(**vuelo_reserva.dict())
    db.add(db_vuelo_reserva)
    db.commit()
    db.refresh(db_vuelo_reserva)
    return db_vuelo_reserva
