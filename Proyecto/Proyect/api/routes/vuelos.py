# routes/vuelos.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.vuelo import VueloCreate, Vuelo
from models.vuelo import Vuelo as VueloModel
from config.db import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/crear_vuelo/", response_model=Vuelo)
def crear_vuelo(vuelo: VueloCreate, db: Session = Depends(get_db)):
    # Obtén el último ID creado
    last_vuelo_id = db.query(VueloModel.VueloID).order_by(
        VueloModel.VueloID.desc()).first()
    new_vuelo_id = 1 if last_vuelo_id is None else last_vuelo_id[0] + 1

    db_vuelo = VueloModel(VueloID=new_vuelo_id, **vuelo.dict())
    db.add(db_vuelo)
    db.commit()
    db.refresh(db_vuelo)
    return db_vuelo


@router.get("/obtener_vuelo/{vuelo_id}", response_model=Vuelo)
def obtener_vuelo(vuelo_id: int, db: Session = Depends(get_db)):
    vuelo = db.query(VueloModel).filter(VueloModel.VueloID == vuelo_id).first()
    if vuelo is None:
        raise HTTPException(status_code=404, detail="Vuelo no encontrado")
    return vuelo


@router.put("/actualizar_vuelo/{vuelo_id}", response_model=Vuelo)
def actualizar_vuelo(vuelo_id: int, vuelo: VueloCreate, db: Session = Depends(get_db)):
    db_vuelo = db.query(VueloModel).filter(
        VueloModel.VueloID == vuelo_id).first()
    if db_vuelo is None:
        raise HTTPException(status_code=404, detail="Vuelo no encontrado")

    for key, value in vuelo.dict().items():
        setattr(db_vuelo, key, value)

    db.commit()
    db.refresh(db_vuelo)
    return db_vuelo


@router.delete("/eliminar_vuelo/{vuelo_id}", response_model=Vuelo)
def eliminar_vuelo(vuelo_id: int, db: Session = Depends(get_db)):
    db_vuelo = db.query(VueloModel).filter(
        VueloModel.VueloID == vuelo_id).first()
    if db_vuelo is None:
        raise HTTPException(status_code=404, detail="Vuelo no encontrado")

    db.delete(db_vuelo)
    db.commit()

    # Reajusta los IDs de los vuelos
    db.query(VueloModel).filter(VueloModel.VueloID > vuelo_id).update(
        {VueloModel.VueloID: VueloModel.VueloID - 1})
    db.commit()

    return db_vuelo
