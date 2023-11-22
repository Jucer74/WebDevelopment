from typing import List
from domain.interfaces.ingredient_interface import IngredientInterface
from sqlalchemy.orm import Session
from fastapi import HTTPException

from domain.schemas import IngredientModel


class IngredientRepositoryImpl(IngredientInterface):
    def __init__(self, db_session: Session):
        self.db = db_session

    #def __exit__(self):
    #    self.db.close()

    def get_all_ingredients(self, db: Session) -> List[IngredientModel]:
        return self.db.query(IngredientModel).all()


    def create_ingredient(self, db: Session, ingredient: IngredientModel) -> IngredientModel:
        self.db.add(ingredient)
        self.db.commit()
        self.db.refresh(ingredient)
        return ingredient
    


    def get_ingredient_by_id(self,db: Session, ingredient_id: int) -> IngredientModel:
        return self.db.query(IngredientModel).filter(IngredientModel.id == ingredient_id).first()

    def get_ingredient_by_name(self, db: Session, name: str) -> IngredientModel:
        return self.db.query(IngredientModel).filter(IngredientModel.name == name).first()
    

    def update_ingredient(self, db: Session, ingredient: IngredientModel) -> IngredientModel:
        ingredient = self.db.query(IngredientModel).filter(IngredientModel.id == ingredient.id).first()

        if not ingredient:
            return None
        
        for k,v in ingredient.dict(exclude_unset=True).items():
            setattr(ingredient, k, v)
        self.db.commit()
        self.db.refresh(ingredient)
        
        return ingredient


    def delete_ingredient(self, db: Session, ingredient_id: int) -> bool:
        ingredient = self.db.query(IngredientModel).filter(IngredientModel.id == ingredient_id).first()
        if not ingredient:
            return False
        self.db.delete(ingredient)
        self.db.commit()
        return True
