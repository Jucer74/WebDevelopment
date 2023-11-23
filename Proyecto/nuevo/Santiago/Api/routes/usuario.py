from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.usuario import UsuarioCreate, Usuario, UsuarioLogin
from models.usuario import Usuario as UsuarioModel
from config.db import SessionLocal

router = APIRouter()

# Dependencia para obtener la sesión de la base de datos


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/users", response_model=Usuario)
def crear_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    # Obtén el último ID creado
    last_user_id = db.query(UsuarioModel.UsuarioID).order_by(
        UsuarioModel.UsuarioID.desc()).first()
    new_user_id = 1 if last_user_id is None else last_user_id[0] + 1

    db_usuario = UsuarioModel(UsuarioID=new_user_id, **usuario.dict())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario


@router.get("/users/{usuario_id}", response_model=Usuario)
def obtener_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(UsuarioModel).filter(
        UsuarioModel.UsuarioID == usuario_id).first()
    if usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario


@router.get("/users", response_model=list[Usuario])
def obtener_usuarios(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    query = db.query(UsuarioModel).offset(skip).limit(limit)
    users = query.all()
    return users


@router.put("/users/{usuario_id}", response_model=Usuario)
def actualizar_usuario(usuario_id: int, usuario: UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = db.query(UsuarioModel).filter(
        UsuarioModel.UsuarioID == usuario_id).first()
    if db_usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    for key, value in usuario.dict().items():
        setattr(db_usuario, key, value)

    db.commit()
    db.refresh(db_usuario)
    return db_usuario


@router.delete("/users/{usuario_id}", response_model=Usuario)
def eliminar_usuario(usuario_id: int, db: Session = Depends(get_db)):
    db_usuario = db.query(UsuarioModel).filter(
        UsuarioModel.UsuarioID == usuario_id).first()
    if db_usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    db.delete(db_usuario)
    db.commit()

    # Reajusta los IDs de los usuarios
    db.query(UsuarioModel).filter(UsuarioModel.UsuarioID > usuario_id).update(
        {UsuarioModel.UsuarioID: UsuarioModel.UsuarioID - 1})
    db.commit()

    return db_usuario


@router.post("/login", response_model=Usuario, tags=["Login"])
def iniciar_sesion(usuario_login: UsuarioLogin, db: Session = Depends(get_db)):
    usuario_db = db.query(UsuarioModel).filter(
        UsuarioModel.CorreoElectronico == usuario_login.CorreoElectronico).first()
    if usuario_db is None or usuario_db.Contrasena != usuario_login.Contrasena:
        raise HTTPException(
            status_code=401, detail="Correo electrónico o contraseña incorrectos")
    return usuario_db


@router.post("/signup", response_model=Usuario, tags=["Registro"])
def registro(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    existing_user = db.query(UsuarioModel).filter(
        UsuarioModel.CorreoElectronico == usuario.CorreoElectronico).first()
    if existing_user:
        raise HTTPException(
            status_code=400, detail="El correo electrónico ya está registrado")

    last_user_id = db.query(UsuarioModel.UsuarioID).order_by(
        UsuarioModel.UsuarioID.desc()).first()
    new_user_id = 1 if last_user_id is None else last_user_id[0] + 1

    db_usuario = UsuarioModel(UsuarioID=new_user_id, **usuario.dict())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)

    return db_usuario
