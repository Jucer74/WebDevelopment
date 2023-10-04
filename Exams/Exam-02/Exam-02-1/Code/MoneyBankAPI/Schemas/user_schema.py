from datetime import datetime
from pydantic import BaseModel
from typing import Optional
from decimal import Decimal

class UserSchema(BaseModel):
    id: str | None = None 
    AccountType: str
    CreationDate: datetime
    AccountNumber: int
    OwnerName: str
    BalanceAmount: Decimal
    OverdraftAmount: Decimal

    def calculate_balance_and_overdraft(cls, values):
        # Calcula BalanceAmount y OverdraftAmount aquí
        values['BalanceAmount'] = calculate_balance()
        values['OverdraftAmount'] = calculate_overdraft()
        return values
    
def calculate_balance():
    return float(1000.0)

def calculate_overdraft():
    return float(500.0)