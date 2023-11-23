from pydantic import BaseModel
from datetime import datetime

class AccountsSchema(BaseModel):
    AccountType: str
    CreationDate: datetime
    AccountNumber: str
    OwnerName: str
    BalanceAmount: float
    OverdraftAmount: float

class DepositInput(BaseModel):
    amount: float

class WithdrawInput(BaseModel):
    amount: float   
