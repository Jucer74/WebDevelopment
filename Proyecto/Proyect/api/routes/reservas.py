# routes/reservas.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.reserva import ReservaCreate, Reserva
from models.reserva import Reserva as ReservaModel
from config.db import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/bookings", response_model=Reserva)
def crear_reserva(reserva: ReservaCreate, db: Session = Depends(get_db)):
    db_reserva = ReservaModel(**reserva.dict())
    db.add(db_reserva)
    db.commit()
    db.refresh(db_reserva)
    return db_reserva


@router.get("/bookings/{reserva_id}", response_model=Reserva)
def obtener_reserva(reserva_id: int, db: Session = Depends(get_db)):
    reserva = db.query(ReservaModel).filter(
        ReservaModel.ReservaID == reserva_id).first()
    if reserva is None:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    return reserva


@router.get("/bookings", response_model=list[Reserva])
def obtener_reservas(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    query = db.query(ReservaModel).offset(skip).limit(limit)
    users = query.all()
    return users

@router.put("/bookings/{reserva_id}", response_model=Reserva)
def actualizar_reserva(reserva_id: int, producto: ReservaCreate, db: Session = Depends(get_db)):
    db_reserva = db.query(ReservaModel).filter(
        ReservaModel.ReservaID == reserva_id).first()
    if db_reserva is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    for Key, Value in producto.dict().items():
        setattr(db_reserva, Key, Value)

    db.commit()
    db.refresh(db_reserva)
    return db_reserva

@router.delete("/bookings/{producto_id}", response_model=Reserva)
def eliminar_producto(reserva_id: int, db: Session = Depends(get_db)):
    db_reserva = db.query(ReservaModel).filter(
        ReservaModel.ReservaID == reserva_id).first()
    if db_reserva is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(db_reserva)
    db.commit()

    db.query(ReservaModel).filter(ReservaModel.ReservaID > reserva_id).update(
        {ReservaModel.ReservaID: ReservaModel.ReservaID - 1}
    )
    db.commit()

    return db_reserva