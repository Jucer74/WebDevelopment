from sqlalchemy import Column, Integer, String, DateTime, DECIMAL
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class AccountModel(Base):
    __tablename__ = "accounts"

    Id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    AccountType = Column(String(1), nullable=False)
    CreationDate = Column(DateTime, nullable=False, default=func.now())
    AccountNumber = Column(String(10), nullable=False, unique=True)
    OwnerName = Column(String(100), nullable=False)
    BalanceAmount = Column(DECIMAL(precision=18, scale=2), nullable=False)
    OverdraftAmount = Column(DECIMAL(precision=18, scale=2), nullable=False)

class Config:
    orm_mode = True
