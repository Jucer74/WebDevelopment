from sqlalchemy import Column, Integer, String, DateTime, Decimal
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class StudentModel(Base):
    __tablename__ = "Students"


    Id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    AccountType = Column(String(1), nullable=False)
    CreationDate = Column(DateTime, nullable=False,)
    AccountNumber = Column(String(10), nullable=False)
    OwnerName = Column(String(100), nullable=False)
    BalanceAmount = Column(Decimal(18, 2), nullable=False)
    OverdraftAmount = Column(Decimal(18, 2), nullable=False)

class Config:
        orm_mode = True