from typing import List
from domain.interfaces.user_interface import UserInterface
# from domain.models.user import User
from sqlalchemy.orm import Session
from fastapi import HTTPException

from domain.schemas import UserModel


class UserRepositoryImpl(UserInterface):
    def __init__(self, db_session: Session):
        self.db = db_session

    #def __exit__(self):
    #    self.db.close()

    def get_all_users(self, db: Session) -> List[UserModel]:
        return self.db.query(UserModel).all()


    def create_user(self, db: Session, user: UserModel) -> UserModel:
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user
    
    # self.db y db refieren a la misma sesion pero db es la que se pasa como parametro y self.db es la que se inicializa en el constructor


    def get_user_by_id(self,db: Session, user_id: int) -> UserModel:
        return self.db.query(UserModel).filter(UserModel.id == user_id).first()

    def get_user_by_email(self, db: Session, email: str) -> UserModel:
        return self.db.query(UserModel).filter(UserModel.email == email).first()
    

    def update_user(self, db: Session, user: UserModel) -> UserModel:
        user = self.db.query(UserModel).filter(UserModel.id == user.id).first()

        if not user:
            return None
        
        for k,v in user.dict(exclude_unset=True).items():
            setattr(user, k, v)
            
        self.db.commit()
        self.db.refresh(user)
        
        return user


    def delete_user(self, db: Session, user_id: int) -> bool:
        user = self.db.query(UserModel).filter(UserModel.id == user_id).first()
        if not user:
            return False
        self.db.delete(user)
        self.db.commit()
        return True
    