from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, Session

# Configuración de la base de datos
DATABASE_URL = "mysql+mysqlconnector://usuario_pizzeria:LaPizzeria@localhost/pizzeria"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Definir modelos SQLAlchemy
metadata = declarative_base()

class Categoria(metadata):
    __tablename__ = "categorias"
    id = Column(Integer, primary_key=True, index=True)
    imagen_url = Column(String(255))
    descripcion = Column(String(255))

class Producto(metadata):
    __tablename__ = "productos"
    id = Column(Integer, primary_key=True, index=True)
    categoria_id = Column(Integer, ForeignKey("categorias.id"))
    imagen_url = Column(String(255))
    nombre = Column(String(255))
    precio = Column(Float)

# Crear tablas en la base de datos
metadata.metadata.create_all(bind=engine)

# Configuración de la aplicación FastAPI
app = FastAPI()

# Función para obtener la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# Rutas de la API
@app.get("/categorias/{categoria_id}")
async def read_categoria(categoria_id: int, db: Session = Depends(get_db)):
    categoria = db.query(Categoria).filter(Categoria.id == categoria_id).first()
    if categoria is None:
        raise HTTPException(status_code=404, detail="Categoria no encontrada")
    return categoria

@app.get("/productos/{producto_id}")
async def read_producto(producto_id: int, db: Session = Depends(get_db)):
    producto = db.query(Producto).filter(Producto.id == producto_id).first()
    if producto is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto


