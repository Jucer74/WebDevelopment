from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal

class StudentSchema(BaseModel):
    Id: int
    AccountType: str
    CreationDate: datetime
    AccountNumber: str
    OwnerName: str
    BalanceAmount: Decimal
    OverdraftAmount: Decimal

    Sex: str