from typing import List

from fastapi import HTTPException
from domain.interfaces.user_interface import UserInterface
from domain.models.user import User
from application.dtos.user_dto import UserCreateDTO, UserUpdateDTO
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from domain.schemas import UserModel
from infrastructure.repository_impl.user_repository import UserRepositoryImpl

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# El contexto de cifrado es una clase que nos permite cifrar y verificar contraseñas para permitir autenticación segura y login

class UserService:
    def __init__(self, user_repository: UserRepositoryImpl):
        self.user_repository = user_repository

    
    def create_user(self, db: Session, user_data: UserCreateDTO) -> UserModel:
        
        hashed = pwd_context.hash(user_data.password)

        if self.get_user_by_email(db, user_data.email):
            raise ValueError("User already exists")
       
        # Create a new User model instance
        new_user = UserModel(
            # id = user_data.id,
            email=user_data.email, 
            hashed_password=hashed, 
            name=user_data.name, 
            last_name=user_data.last_name, 
            phone=user_data.phone if user_data.phone else None,
            is_active=True
        )

        try:
            return self.user_repository.create_user(db, new_user)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error creating user: {str(e)}")
        #return new_user


    def auth_user(self, db: Session, email: str, password: str) -> UserModel:
        user = self.user_repository.get_user_by_email(db, email)
        if not user or not pwd_context.verify(password, user.hashed_password):
            return None
        return user

    def get_user_by_id(self, db: Session, user_id: int) -> UserModel:
        return self.user_repository.get_user_by_id(db, user_id)
    
    def get_user_by_email(self, db: Session, email: str) -> UserModel:
        return self.user_repository.get_user_by_email(db, email)

    def get_all_users(self, db: Session) -> List[UserModel]:
        return self.user_repository.get_all_users(db)

    def update_user(self, db: Session, user_id: int, update_data: UserUpdateDTO) -> User:
        user = self.user_repository.get_user_by_id(db, user_id)
        if not user:
            return None
        for key, value in update_data.model_dump(exclude_unset=True).items():
            setattr(user, key, value)
        db.commit()
        db.refresh(user)
        return user
    

    def delete_user(self, db: Session, user_id: int) -> bool:
        return self.user_repository.delete_user(db, user_id)
                #self.user_repository.get_user_by_id(db, user_id)
        # if not user:
            # return False
        # self.user_repository.delete_user(db, user_id)
        # return True
    