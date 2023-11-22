from pydantic import BaseModel
from typing import List

class Ingredient(BaseModel):
    id: int
    name: str
    quantity: int
    image: str

