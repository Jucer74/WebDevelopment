# routes/destinos_reservas.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.destinos_reserva import DestinoReservaCreate, DestinoReserva
from models.destinos_reserva import DestinoReserva as DestinoReservaModel
from config.db import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/asociar_destino_reserva/", response_model=DestinoReserva)
def asociar_destino_reserva(destino_reserva: DestinoReservaCreate, db: Session = Depends(get_db)):
    db_destino_reserva = DestinoReservaModel(**destino_reserva.dict())
    db.add(db_destino_reserva)
    db.commit()
    db.refresh(db_destino_reserva)
    return db_destino_reserva
