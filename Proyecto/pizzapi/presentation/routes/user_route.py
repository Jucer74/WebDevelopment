from typing import List
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from domain.models.user import User, UserCreate
from application.services.user_service import UserService
from application.dtos.user_dto import UserCreateDTO, UserResponseDTO, UserUpdateDTO
from infrastructure.database.db import SessionLocal
from infrastructure.dependencies import get_db
from infrastructure.repository_impl.user_repository import UserRepositoryImpl
#import json


router = APIRouter()


def get_user_service(db: Session = Depends(get_db)) -> UserService:
    user_repository = UserRepositoryImpl(db_session=db)  # 
    return UserService(user_repository=user_repository)


@router.post("/users/create", response_model=UserResponseDTO, tags=["Users"])
async def create_user(user_create_dto: UserCreateDTO, db: Session = Depends(get_db)):
    try:
        user_service = get_user_service(db)
        db_user = user_service.get_user_by_email(db, user_create_dto.email)
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered! Try another one")
        user = user_service.create_user(db, user_create_dto)
        return user
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Internal Server Error: {str(e)}"})

        
    

@router.get("/users", response_model=List[UserResponseDTO], tags=["Users"])
async def get_users(db: Session = Depends(get_db)):
    try:
        user_service = get_user_service(db)
        users = user_service.get_all_users(db)
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Internal Server Error: {str(e)}"})
    finally:
        return users


@router.get("/users/{user_id}", response_model=UserResponseDTO, tags=["Users"])
async def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user_service = get_user_service(db)
    try:
        user = user_service.get_user_by_id(db, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        else:
            return user
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error {str(e)}"})
    

@router.put("/users/{user_id}", response_model=UserResponseDTO, tags=["Users"])
async def update_user(user_id: int, update_data: UserUpdateDTO, db: Session = Depends(get_db)):
    try:
        user_service = get_user_service(db)
        user = user_service.update_user(db, user_id, update_data)#.model_dump(exclude_unset=True))

        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error {str(e)}"})
    

@router.delete("/users/{user_id}", response_model=bool, tags=["Users"])
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    try:
        user_service = get_user_service(db)
        user = user_service.get_user_by_id(db, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        deleted = user_service.delete_user(db, user_id)
        return deleted
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error {str(e)}"})
    


