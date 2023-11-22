from typing import List, Optional
from pydantic import BaseModel

class PizzaCreateDTO(BaseModel):
    id : Optional[int] = None
    name: str
    description: str
    price: float
    images: Optional[list] = []
    ingredients: Optional[list] = [] # by ids quiza

    class Config:
        orm_mode = True
        from_attributes = True


class PizzaUpdateDTO(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    ingredients: Optional[list] = []  # Lista de ingredientes por id
    images: Optional[list] = []

    class Config:
        orm_mode = True
        from_attributes = True


class PizzaResponseDTO(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    images: Optional[list] = []
    ingredients: Optional[list] = [] 

    class Config:
        orm_mode = True
        from_attributes = True


