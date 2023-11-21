from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class Transaction(BaseModel):
    transaction_id: int
    user_id: int
    amount: float
    transaction_type: str
    transaction_date: datetime
    image_path: Optional[str]

class CreateTransaction(BaseModel):
    user_id: int
    amount: float
    transaction_type: str
    image_path: Optional[str]

class UpdateTransaction(BaseModel):
    user_id: Optional[int] = None
    amount: Optional[float] = None
    transaction_type: Optional[str] = None
    image_path: Optional[str] = None
    transaction_date: Optional[datetime] = None