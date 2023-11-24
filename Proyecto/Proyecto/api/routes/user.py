from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.user import UsuarioCreate, Usuario, UsuarioLogin
from models.user import usuario as UsuarioModel
from config.db import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/users", response_model=Usuario)
def crear_usuario(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    last_user_id = db.query(UsuarioModel.ID).order_by(
        UsuarioModel.ID.desc()).first()
    new_user_id = 1 if last_user_id is None else last_user_id[0] + 1

    db_usuario = UsuarioModel(ID=new_user_id, **usuario.dict())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario


@router.post("/login", response_model=Usuario, tags=["login"])
def iniciar_sesion(usuario_login: UsuarioLogin, db: Session = Depends(get_db)):
    usuario_db = db.query(UsuarioModel).filter(
        UsuarioModel.Correo == usuario_login.Correo).first()
    if usuario_db is None or usuario_db.Contraseña != usuario_login.Contraseña:
        raise HTTPException(
            status_code=401, detail="Correo o Contraseña incorrectos")
    return usuario_db


@router.post("/signup", response_model=Usuario, tags=["Registro"])
def registro(usuario: UsuarioCreate, db: Session = Depends(get_db)):
    existing_user = db.query(UsuarioModel).filter(
        UsuarioModel.Correo == usuario.Correo).first()
    if existing_user:
        raise HTTPException(
            status_code=400, detail="El correo electrónico ya está registrado")

    last_user_id = db.query(UsuarioModel.ID).order_by(
        UsuarioModel.ID.desc()).first()
    new_user_id = 1 if last_user_id is None else last_user_id[0] + 1

    db_usuario = UsuarioModel(ID=new_user_id, **usuario.dict())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)

    return db_usuario


@router.get("/users/{usuario_id}", response_model=Usuario)
def obtener_usuario(usuario_id: int, db: Session = Depends(get_db)):
    usuario = db.query(UsuarioModel).filter(
        UsuarioModel.ID == usuario_id).first()
    if usuario is None:
        raise HTTPException(status_code=404, detail="usuario no encontrado")
    return usuario


@router.get("/users", response_model=list[Usuario])
def obtener_usuarios(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    query = db.query(UsuarioModel).offset(skip).limit(limit)
    users = query.all()
    return users


@router.put("/users/{usuario_id}", response_model=Usuario)
def actualizar_usuario(usuario_id: int, usuario: UsuarioCreate, db: Session = Depends(get_db)):
    db_usuario = db.query(UsuarioModel).filter(
        UsuarioModel.ID == usuario_id).first()
    if db_usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    for Key, value in usuario.dict().items():
        setattr(db_usuario, Key, value)

    db.commit()
    db.refresh(db_usuario)
    return db_usuario


@router.delete("/users/{usuario_id}", response_model=Usuario)
def eliminar_usuario(usuario_id: int, db: Session = Depends(get_db)):
    db_usuario = db.query(UsuarioModel).filter(
        UsuarioModel.ID == usuario_id
    ).first()
    if db_usuario is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(db_usuario)
    db.commit()

    db.query(UsuarioModel).filter(UsuarioModel.ID > usuario_id).update(
        {UsuarioModel.ID: UsuarioModel.ID - 1}
    )
    db.commit()

    return db_usuario
