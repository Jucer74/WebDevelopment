from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel

from application.dtos.pizza_dto import PizzaResponseDTO
from domain.models.order import StatusOrder

class OrderCreateDTO(BaseModel):
    id : Optional[int] = None
    user_id: int
    pizzas: List[int]
    #pizzas: List[PizzaResponseDTO]
    total: float
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
    address: str
    status: Optional[StatusOrder] = "Pending"
    phone: Optional[str] = None
    payment_method: Optional[str] = None
    
    class Config:
        orm_mode = True
        from_attributes = True


class OrderUpdateDTO(BaseModel):
    status: Optional[StatusOrder] = None
    updated_at: Optional[datetime] = datetime.now()
    phone: Optional[str] = None
    payment_method: Optional[str] = None

    class Config:
        orm_mode = True
        from_attributes = True


class OrderResponseDTO(BaseModel):
    id: int
    user_id: int
    #pizzas: List[list]
    pizzas: List[PizzaResponseDTO]
    total: float
    created_at: datetime
    updated_at: datetime
    status: StatusOrder
    address: str
    phone: Optional[str] = None
    payment_method: str

    class Config:
        orm_mode = True
        from_attributes = True



