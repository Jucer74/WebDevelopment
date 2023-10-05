from sqlalchemy import Column, Integer, String, DateTime, Float
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class AccountModel(Base):
    __tablename__ = 'accounts'
    Id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    AccountType = Column(String(1), nullable=False)
    CreationDate = Column(DateTime, nullable=False)
    AccountNumber = Column(String(10), nullable=False)
    OwnerName = Column(String(100), nullable=False)
    BalanceAmount = Column(Float(18,2), nullable=False)
    OverdraftAmount = Column(Float(18,2), nullable=False)

class Config:
    orm_mode = True
