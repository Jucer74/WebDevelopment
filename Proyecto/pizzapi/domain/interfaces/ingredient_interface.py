from abc import ABC, abstractmethod
from typing import List
from domain.models.ingredient import Ingredient

class IngredientInterface(ABC):

    @abstractmethod
    def get_all_ingredients(self) -> List[Ingredient]:
        pass

    @abstractmethod
    def create_ingredient(self, ingredient: Ingredient) -> Ingredient:
        pass

    @abstractmethod
    def get_ingredient_by_id(self, ingredient_id: int) -> Ingredient:
        pass

    @abstractmethod
    def get_ingredient_by_name(self, name: str) -> Ingredient:
        pass

    @abstractmethod
    def update_ingredient(self, ingredient: Ingredient) -> Ingredient:
        pass

    @abstractmethod
    def delete_ingredient(self, ingredient_id: int) -> bool:
        pass
