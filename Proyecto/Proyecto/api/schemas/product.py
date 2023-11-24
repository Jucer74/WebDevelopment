from pydantic import BaseModel
from typing import Optional


class ProductoBase(BaseModel):
    Categoria: str
    Precio: float
    Nombre: str
    Caracteristicas: str
    Imagen: Optional[str]


class ProductoCreate(ProductoBase):
    pass


class Producto(ProductoBase):
    ID_Producto: int

    class Config:
        orm_mode = True
