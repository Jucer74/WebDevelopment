from typing import Optional
from pydantic import BaseModel

class IngredientCreateDTO(BaseModel):
    name: str
    image: str

    class Config:
        orm_mode = True
        from_attributes = True


class IngredientUpdateDTO(BaseModel):
    name: Optional[str] = None
    image: Optional[str] = None

    class Config:
        orm_mode = True
        from_attributes = True


class IngredientResponseDTO(BaseModel):
    id: int
    name: str
    image: str

    class Config:
        orm_mode = True
        from_attributes = True
