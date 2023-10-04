from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class StudentModel(Base):
    __tablename__ = "Students"

    Id = Column(Integer, primary_key=True, index=True)
    FirstName = Column(String(50), nullable=False)
    LastName = Column(String(50))
    DateOfBirth = Column(DateTime, nullable=False)
    Sex = Column(String(1), nullable=False)

    Id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    AccountType = Column(String(1), nullable=False)
    CreationDate = Column(DateTime, nullable=False,)
    AccountNumber = Column(String(10), nullable=False)
    OwnerName = Column(String(100), nullable=False)
    BalanceAmount = Column(Numeric(18, 2), nullable=False)
    OverdraftAmount = Column(Numeric(18, 2), nullable=False)

class Config:
        orm_mode = True