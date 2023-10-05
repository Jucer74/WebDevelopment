from pydantic import BaseModel
from decimal import Decimal
from datetime import datetime

class AccountSchema(BaseModel):
    Id: int
    AccountType: str
    CreationDate: datetime
    AccountNumber: str
    OwnerName: str
    BalanceAmount: float
    OverdraftAmount: float

class DepositInput(BaseModel):
    amount: Decimal

class WithdrawInput(BaseModel):
    amount: Decimal