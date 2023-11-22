from abc import ABC, abstractmethod
from typing import List
from domain.models.pizza import Pizza

class PizzaInterface(ABC):
    
    @abstractmethod
    def create_pizza(self, pizza: Pizza) -> Pizza:
        pass

    @abstractmethod
    def get_pizza_by_id(self, pizza_id: int) -> Pizza:
        pass

    @abstractmethod
    def get_pizza_by_name(self, pizza_name: str) -> Pizza:
        pass

    @abstractmethod
    def get_all_pizzas(self) -> List[Pizza]:
        pass

    @abstractmethod
    def update_pizza(self, pizza_id: int, pizza_data: dict) -> Pizza:
        pass

    @abstractmethod
    def delete_pizza(self, pizza_id: int) -> bool:
        pass
    
