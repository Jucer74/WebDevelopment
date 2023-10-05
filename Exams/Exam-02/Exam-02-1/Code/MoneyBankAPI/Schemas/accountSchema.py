from pydantic import BaseModel, validator
from datetime import datetime

from Config.db import SessionLocal
from Models.accountModel import AccountModel


class AccountSchema(BaseModel):
    #Id: int <- sql ya sabe que es autoincremental
    AccountType: str
    CreationDate: datetime
    AccountNumber: str
    OwnerName: str
    BalanceAmount: float
    OverdraftAmount: float

    # Validaciones para los campos
    @validator("AccountNumber")
    def validate_account_number(cls, value):
        session = SessionLocal()
        existe_cuenta = session.query(AccountModel).filter(AccountModel.AccountNumber == value).first()
        session.close()
        if existe_cuenta:
            raise ValueError("AccountNumber already exists, Debe ser único el número de cuenta. ")
        return value
    
    @validator("AccountType")
    def validate_account_type(cls, value):
        if value not in ["A", "C"]:
            raise ValueError("AccountType must be A or C, Cuenta de ahorros o corriente.")
        return value
    

