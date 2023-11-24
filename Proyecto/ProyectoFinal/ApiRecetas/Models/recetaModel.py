from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class recetas(Base):
    __tablename__ = "recetas"

    id_receta = Column(Integer, primary_key=True, index=True, autoincrement=True)
    titulo = Column(String(200))
    descripcion = Column(String(200))

