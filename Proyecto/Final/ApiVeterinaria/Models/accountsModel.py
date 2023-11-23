from sqlalchemy import Column, Integer, String, DateTime, Float  
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class AccountsModel(Base):
    __tablename__ = "Accounts"

    Id = Column(Integer, primary_key=True, index=True)
    AccountType = Column(String(50), nullable=False)  
    CreationDate = Column(DateTime, nullable=False)  
    AccountNumber = Column(String(10), nullable=False)  
    OwnerName = Column(String(100), nullable=False)  
    BalanceAmount = Column(Float, nullable=False)  
    OverdraftAmount = Column(Float, nullable=False) 

class Config:
    orm_mode = True