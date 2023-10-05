from sqlalchemy import Column, Integer, String, DateTime, Numeric
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class AccountModel(Base):
    __tablename__ = "Accounts"

    Id = Column(Integer, primary_key=True, index=True)
    AccountType = Column(String(1), nullable=False)
    CreationDate = Column(DateTime, nullable=False)
    AccountNumber = Column(String(10), nullable=False)
    OwnerName = Column(String(100), nullable=False)
    BalanceAmount = Column(Numeric(18, 2), nullable=False)
    OverdraftAmount = Column(Numeric(18, 2), nullable=False)

class Config:
        orm_mode = True