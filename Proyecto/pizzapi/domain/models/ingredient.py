from pydantic import BaseModel
from typing import List

class Ingredient(BaseModel):
    name: str
    quantity: int

