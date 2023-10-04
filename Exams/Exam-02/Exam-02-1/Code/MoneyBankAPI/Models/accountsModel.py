from sqlalchemy import Column, Integer, String, DateTime, DECIMAL  # Agrega DECIMAL aquí
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class AcccountsModel(Base):
    __tablename__ = "Accounts"

    Id = Column(Integer, primary_key=True, index=True)
    AccountType = Column(String(50), nullable=False)  
    CreationDate = Column(DateTime, nullable=False)  
    AccountNumber = Column(String(10), nullable=False)  
    OwnerName = Column(String(100), nullable=False)  
    BalanceAmount = Column(DECIMAL(18, 2), nullable=False)  
    OverdraftAmount = Column(DECIMAL(18, 2), nullable=False)  

class Config:
        orm_mode = True
