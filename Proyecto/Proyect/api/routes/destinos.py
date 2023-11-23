# routes/destinos.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.destino import DestinoCreate, Destino
from models.destino import Destino as DestinoModel
from config.db import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/crear_destino/", response_model=Destino)
def crear_destino(destino: DestinoCreate, db: Session = Depends(get_db)):
    # Obtén el último ID creado
    last_destino_id = db.query(DestinoModel.DestinoID).order_by(
        DestinoModel.DestinoID.desc()).first()
    new_destino_id = 1 if last_destino_id is None else last_destino_id[0] + 1

    db_destino = DestinoModel(DestinoID=new_destino_id, **destino.dict())
    db.add(db_destino)
    db.commit()
    db.refresh(db_destino)
    return db_destino


@router.get("/obtener_destino/{destino_id}", response_model=Destino)
def obtener_destino(destino_id: int, db: Session = Depends(get_db)):
    destino = db.query(DestinoModel).filter(
        DestinoModel.DestinoID == destino_id).first()
    if destino is None:
        raise HTTPException(status_code=404, detail="Destino no encontrado")
    return destino


@router.put("/actualizar_destino/{destino_id}", response_model=Destino)
def actualizar_destino(destino_id: int, destino: DestinoCreate, db: Session = Depends(get_db)):
    db_destino = db.query(DestinoModel).filter(
        DestinoModel.DestinoID == destino_id).first()
    if db_destino is None:
        raise HTTPException(status_code=404, detail="Destino no encontrado")

    for key, value in destino.dict().items():
        setattr(db_destino, key, value)

    db.commit()
    db.refresh(db_destino)
    return db_destino


@router.delete("/eliminar_destino/{destino_id}", response_model=Destino)
def eliminar_destino(destino_id: int, db: Session = Depends(get_db)):
    db_destino = db.query(DestinoModel).filter(
        DestinoModel.DestinoID == destino_id).first()
    if db_destino is None:
        raise HTTPException(status_code=404, detail="Destino no encontrado")

    db.delete(db_destino)
    db.commit()

    # Reajusta los IDs de los destinos
    db.query(DestinoModel).filter(DestinoModel.DestinoID > destino_id).update(
        {DestinoModel.DestinoID: DestinoModel.DestinoID - 1})
    db.commit()

    return db_destino
