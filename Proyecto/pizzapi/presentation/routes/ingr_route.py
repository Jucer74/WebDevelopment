from typing import List
from fastapi import Depends, HTTPException
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from application.dtos.ingredient_dto import IngredientCreateDTO, IngredientResponseDTO, IngredientUpdateDTO
from application.services.ingredient_service import IngredientService
from infrastructure.dependencies import get_db

from infrastructure.repository_impl.ingredient_repository import IngredientRepositoryImpl




router = APIRouter()


def get_ingredient_service(db: Session = Depends(get_db)) -> IngredientService:
    ingredient_repository = IngredientRepositoryImpl(db_session=db)
    return IngredientService(ingredient_repository=ingredient_repository)


@router.get("/ingredients", response_model = List[IngredientResponseDTO],tags=["Ingredients"])
async def get_ingredients(db: Session = Depends(get_db)):
    try:
        ing_service = get_ingredient_service(db)
        ingredients = ing_service.get_all_ingredients(db)
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Internal Server Error: {str(e)}"})
    finally:
        return ingredients
    


@router.get("/ingredients/{ingredient_id}", response_model=IngredientResponseDTO, tags=["Ingredients"])
async def get_ingredient_by_id(ingredient_id: int, db: Session = Depends(get_db)):
    ing_service = get_ingredient_service(db)
    try:
        ingredient = ing_service.get_ingredient_by_id(db, ingredient_id)
        if not ingredient:
            raise HTTPException(status_code=404, detail="Ingredient not found")
        else:
            return ingredient
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error {str(e)}"})
    


@router.post("/ingredients/create", response_model=IngredientResponseDTO, tags=["Ingredients"])
async def create_ingredient(ingredient_create_dto: IngredientCreateDTO, db: Session = Depends(get_db)):
    try:
        ing_service = get_ingredient_service(db)
        db_ingredient = ing_service.get_ingredient_by_name(db, ingredient_create_dto.name)
        if db_ingredient:
            raise HTTPException(status_code=400, detail="Ingredient already exists")
        ingredient = ing_service.create_ingredient(db, ingredient_create_dto)
        return ingredient
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Internal Server Error: {str(e)}"})
    


@router.put("/ingredients/{ingredient_id}", response_model=IngredientResponseDTO, tags=["Ingredients"])
async def update_ingredient(ingredient_id: int, ingredient_update_dto: IngredientUpdateDTO, db: Session = Depends(get_db)):
    ing_service = get_ingredient_service(db)
    try:
        ingredient = ing_service.get_ingredient_by_id(db, ingredient_id)
        if not ingredient:
            raise HTTPException(status_code=404, detail="Ingredient not found")
        ingredient = ing_service.update_ingredient(db, ingredient_id, ingredient_update_dto)
        return ingredient
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error {str(e)}"})
    


@router.delete("/ingredients/{ingredient_id}", response_model=bool, tags=["Ingredients"])
async def delete_ingredient(ingredient_id: int, db: Session = Depends(get_db)):
    ing_service = get_ingredient_service(db)
    try:
        ingredient = ing_service.get_ingredient_by_id(db, ingredient_id)
        if not ingredient:
            raise HTTPException(status_code=404, detail="Ingredient not found")
        return ing_service.delete_ingredient(db, ingredient_id)
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error {str(e)}"})
