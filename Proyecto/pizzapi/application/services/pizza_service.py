from typing import List
from fastapi import HTTPException
from sqlalchemy.orm import Session
from application.dtos.pizza_dto import PizzaCreateDTO, PizzaUpdateDTO
from domain.interfaces.pizza_interface import PizzaInterface
# from domain.models.pizza import Pizza
from domain.schemas import IngredientModel, PizzaModel
from infrastructure.repository_impl.ingredient_repository import IngredientRepositoryImpl
from infrastructure.repository_impl.pizza_repository import PizzaRepositoryImpl

class PizzaService:
    def __init__(self, pizza_repository: PizzaRepositoryImpl, ingredient_repository: IngredientRepositoryImpl):
        self.pizza_repository = pizza_repository
        self.ingredient_repository = ingredient_repository


    def create_pizza(self, db: Session, pizza_data: PizzaCreateDTO) -> PizzaModel:
        if self.get_pizza_by_id(db, pizza_data.id) is not None or self.get_pizza_by_name(db, pizza_data.name) is not None:
            raise HTTPException(status_code=400, detail="Pizza already exists")
        
        pizza_images = pizza_data.images + [self.ingredient_repository.get_ingredient_by_id(db, ing).image for ing in pizza_data.ingredients]

        pizza_images = []
        for url in pizza_data.images:
            pizza_images.append(url)
        for ing in pizza_data.ingredients:
            pizza_images.append(self.ingredient_repository.get_ingredient_by_id(db, ing).image)
    

        ingredientes = []
        for ingredient_id in pizza_data.ingredients:
            ingredient = self.ingredient_repository.get_ingredient_by_id(db, ingredient_id)
            if ingredient:
                ingredientes.append(ingredient)


        new_pizza = PizzaModel(
            id = pizza_data.id,
            name = pizza_data.name,
            description = pizza_data.description,
            price = pizza_data.price,
            ingredients = ingredientes,
            images = pizza_images
        )

        try:
            return self.pizza_repository.create_pizza(db, new_pizza)
        
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error creating pizza: {str(e)}")
        
    
    def get_pizza_by_id(self, db: Session, pizza_id: int) -> PizzaModel:
        return self.pizza_repository.get_pizza_by_id(db, pizza_id)

    
    def get_pizza_images(self, db: Session, pizza_id: int) -> List[str]:
        return self.pizza_repository.get_pizza_images(db, pizza_id)
    

    def get_pizza_by_name(self, db: Session, pizza_name: str) -> PizzaModel:
        return self.pizza_repository.get_pizza_by_name(db, pizza_name)
    
    
    def get_all_pizzas(self, db: Session) -> List[PizzaModel]:
        return self.pizza_repository.get_all_pizzas(db)
    
    def get_ingredient_by_id(self, db: Session, ingredient_id: int) -> IngredientModel:
        return self.ingredient_repository.get_ingredient_by_id(db, ingredient_id)

    def get_ingredients_pizza(self, db: Session, pizza_id: int) -> List[IngredientModel]:
        ingredientes = []
        for ing in self.pizza_repository.get_pizza_by_id(db, pizza_id).ingredients:
            ingredientes.append(self.ingredient_repository.get_ingredient_by_id(db, ing))
        return ingredientes
            


    def update_pizza(self, db: Session, pizza_id: int, pizza_data: PizzaUpdateDTO) -> PizzaModel:
        pizza = self.pizza_repository.get_pizza_by_id(db, pizza_id)
        if not pizza:
            return None

        ingredientes = []
        for ingredient_id in pizza_data.ingredients:
            ingredient = self.ingredient_repository.get_ingredient_by_id(db, ingredient_id)
            if ingredient:
                ingredientes.append(ingredient)

        pizza_data.ingredients = ingredientes

        for key, value in pizza_data.model_dump(exclude_unset=True).items():
            setattr(pizza, key, value)
        db.commit()
        db.refresh(pizza)
        return pizza

        # updated_pizza = PizzaModel(
        #     id=pizza_id,
        #     name=pizza_data.name,
        #     description=pizza_data.description,
        #     price=pizza_data.price,
        #     ingredients=pizza_data.ingredients,
        #     images=pizza_data.images
        # )

        # try:
        #     return self.pizza_repository.update_pizza(db, updated_pizza)
        # except Exception as e:
        #     raise HTTPException(status_code=400, detail=f"Error updating pizza: {str(e)}")
    

    def delete_pizza(self, db: Session, pizza_id: int) -> bool:
        #pizza = self.pizza_repository.get_pizza_by_id(db, pizza_id)
        return self.pizza_repository.delete_pizza(db, pizza_id)
        
    
    
    
