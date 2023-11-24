from sqlalchemy import Column, Integer, String, DECIMAL
from config.db import Base


class productos(Base):
    __tablename__ = 'productos'

    ID_Producto = Column(Integer, primary_key=True, index=True)
    Categoria = Column(String(50), index=True)
    Precio = Column(DECIMAL(10, 2))
    Nombre = Column(String(100), index=True)
    Caracteristicas = Column(String(255), index=True)
    Imagen = Column(String(255), index=True)
