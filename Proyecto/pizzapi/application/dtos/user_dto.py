from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreateDTO(BaseModel):
    id : Optional[int] = None
    name: str
    last_name: Optional[str] = None
    email: EmailStr
    password: str
    phone: Optional[str] = None
    is_active: Optional[bool] = True
    #orders: Optional[list] = None


class UserUpdateDTO(BaseModel):
    name: Optional[str] = None
    last_name: Optional[str] = None
    is_active: Optional[bool] = None
    phone: Optional[str] = None
    orders: Optional[list] = None
    email: Optional[EmailStr] = None


class UserResponseDTO(BaseModel):
    id: int
    name: str
    last_name: str
    email: EmailStr
    is_active: bool
    phone: Optional[str] = None
    orders: Optional[list] = None

    class Config:
        orm_mode = True
        from_attributes = True