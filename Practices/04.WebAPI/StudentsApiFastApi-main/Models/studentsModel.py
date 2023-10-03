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

class Config:
        orm_mode = True