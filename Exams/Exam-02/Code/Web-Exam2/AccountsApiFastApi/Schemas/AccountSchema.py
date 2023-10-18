from pydantic import BaseModel
from datetime import datetime

class AccountSchema(BaseModel):
    Id: int
    AccountType: str
    CreationDate: datetime
    AccountNumber: str
    OwnerName: str
    BalanceAmount: float
    OverdraftAmount: float

