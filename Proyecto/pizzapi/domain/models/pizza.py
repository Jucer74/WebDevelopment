from pydantic import BaseModel
from typing import List
from .ingredient import Ingredient


# Modelo de Pizza
class Pizza(BaseModel):
    id: int
    name: str
    ingredients: List[Ingredient]
    description: str
    price: float
    

