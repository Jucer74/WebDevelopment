from sqlalchemy import Column, Integer, String, DateTime, Numeric
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class AccountModel(Base):
    __tablename__ = "Accounts"

    Id = Column(Integer, primary_key=True)
    AccountType = Column(String(1))
    CreationDate = Column(DateTime)
    AccountNumber = Column(String(10))
    OwnerName = Column(String(100))
    BalanceAmount = Column(Numeric(18, 2))
    OverdraftAmount = Column(Numeric(18, 2))

class Config:
        orm_mode = True