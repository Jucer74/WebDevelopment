from pydantic import BaseModel
from datetime import datetime
from typing import List
from enum import Enum
from .pizza import Pizza


class StatusOrder(Enum):
    PENDING   = "Pending"
    PREPARING = "Preparing"
    DELIVERING= "Delivering"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"



class Order(BaseModel):
    id: int
    user_id: int
    pizzas: List[Pizza]
    total: float

    created_at: datetime
    updated_at: datetime
    status: StatusOrder
    address: str
    phone: str
    payment_method: str