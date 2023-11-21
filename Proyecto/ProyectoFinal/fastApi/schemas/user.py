from typing import Optional
from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    email: str
    password: Optional[str] = None
    username: str
    address: Optional[str] = None
    city: Optional[str] = None
    balance: Optional[float] = None
    account_type: Optional[str] = None

class CreateUser(BaseModel):
    name: str
    email: str
    password: str
    username: str
    address: str 
    city: str  
    balance: Optional[float] = 0.0
    account_type: str = 'Checking'

class UpdateUser(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    username: Optional[str] = None
    address: Optional[str] = None  
    city: Optional[str] = None  
    balance: Optional[float] = None
    account_type: Optional[str] = None

class LoginUser(BaseModel):
    username: str
    password: Optional[str]