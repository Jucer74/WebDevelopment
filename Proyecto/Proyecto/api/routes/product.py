from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.product import ProductoCreate, Producto
from models.product import productos as ProductosModel
from config.db import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/products", response_model=Producto)
def crear_producto(producto: ProductoCreate, db: Session = Depends(get_db)):
    last_product_id = db.query(ProductosModel.ID_Producto).order_by(
        ProductosModel.ID_Producto.desc()).first()
    new_product_id = 1 if last_product_id is None else last_product_id[0] + 1

    db_product = ProductosModel(ID_Producto=new_product_id, **producto.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.get("/products", response_model=list[Producto])
def obtener_productos(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    query = db.query(ProductosModel).offset(skip).limit(limit)
    users = query.all()
    return users

@router.get("/products/{producto_id}", response_model=Producto)
def obtener_producto(producto_id: int, db: Session = Depends(get_db)):
    producto = db.query(ProductosModel).filter(
        ProductosModel.ID_Producto == producto_id).first()
    if producto is None:
        raise HTTPException(status_code=404, detail="producto no encontrado")
    return producto


@router.put("/products/{producto_id}", response_model=Producto)
def actualizar_producto(producto_id: int, producto: ProductoCreate, db: Session = Depends(get_db)):
    db_producto = db.query(ProductosModel).filter(
        ProductosModel.ID_Producto == producto_id).first()
    if db_producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    for Key, Value in producto.dict().items():
        setattr(db_producto, Key, Value)

    db.commit()
    db.refresh(db_producto)
    return db_producto


@router.delete("/products/{producto_id}", response_model=Producto)
def eliminar_producto(producto_id: int, db: Session = Depends(get_db)):
    db_producto = db.query(ProductosModel).filter(
        ProductosModel.ID_Producto == producto_id).first()
    if db_producto is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db.delete(db_producto)
    db.commit()

    db.query(ProductosModel).filter(ProductosModel.ID_Producto > producto_id).update(
        {ProductosModel.ID_Producto: ProductosModel.ID_Producto - 1}
    )
    db.commit()

    return db_producto
