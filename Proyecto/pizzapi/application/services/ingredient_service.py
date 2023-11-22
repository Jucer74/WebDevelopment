

from typing import List
from fastapi import HTTPException
from sqlalchemy.orm import Session
from application.dtos.ingredient_dto import IngredientCreateDTO
from domain.schemas import IngredientModel
from infrastructure.repository_impl.ingredient_repository import IngredientRepositoryImpl



class IngredientService:
    def __init__(self, ingredient_repository: IngredientRepositoryImpl):
        self.ingredient_repository = ingredient_repository

    def create_ingredient(self, db: Session, ingredient_data: IngredientCreateDTO) -> IngredientModel:

        if self.get_ingredient_by_name(db, ingredient_data.name):
            raise HTTPException(status_code=400, detail="Ingredient already exists")
        new_ingredient = IngredientModel(name=ingredient_data.name, image=ingredient_data.image if ingredient_data.image else None)
        try:
            return self.ingredient_repository.create_ingredient(db, new_ingredient)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error creating ingredient: {str(e)}")
        
    
    def get_ingredient_by_id(self, db: Session, ingredient_id: int) -> IngredientModel:
       return self.ingredient_repository.get_ingredient_by_id(db, ingredient_id)

    def get_ingredient_by_name(self, db: Session, ingredient_name: str) -> IngredientModel:
        return self.ingredient_repository.get_ingredient_by_name(db, ingredient_name)
    

    def get_all_ingredients(self, db: Session) -> List[IngredientModel]:
        return self.ingredient_repository.get_all_ingredients(db)
    

    def update_ingredient(self, db: Session, ingredient_id: int, ingredient_data: dict) -> IngredientModel:
        ingredient = self.ingredient_repository.get_ingredient_by_id(db, ingredient_id)
        if not ingredient:
            raise HTTPException(status_code=404, detail="Ingredient not found")
        for key, value in ingredient_data.model_dump(exclude_unset=True).items():
            setattr(ingredient, key, value)
        db.commit()
        db.refresh(ingredient)
        return ingredient
    

    def delete_ingredient(self, db: Session, ingredient_id: int) -> bool:
        ingredient = self.ingredient_repository.get_ingredient_by_id(db, ingredient_id)
        if not ingredient:
            raise HTTPException(status_code=404, detail="Ingredient not found")
        return self.ingredient_repository.delete_ingredient(db, ingredient_id)
    
    
    def delete_duplicates(self, db: Session) -> bool:
        return self.ingredient_repository.delete_duplicates(db)
    

    
    
    