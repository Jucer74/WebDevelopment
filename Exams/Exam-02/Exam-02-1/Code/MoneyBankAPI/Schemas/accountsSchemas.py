from pydantic import BaseModel
from datetime import datetime

class AccountsSchemas(BaseModel):
    Id: int
    AccountType: str
    CreationDate: datetime
    AccountNumber: str
    OwnerName: str
    BalanceAmount: float
    OverDraftAmount: float