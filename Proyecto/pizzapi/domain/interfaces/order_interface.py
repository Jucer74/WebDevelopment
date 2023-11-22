from abc import ABC, abstractmethod
from typing import List
from domain.models.order import Order

class OrderInterface(ABC):
    @abstractmethod
    def create(self, order) -> Order:
        pass

    @abstractmethod
    def update(self, order_id: int, order_data: dict) -> Order:
        pass

    @abstractmethod
    def delete(self, order_id : int) -> bool:
        pass

    @abstractmethod
    def get(self, order_id : int) -> Order:
        pass

    @abstractmethod
    def get_all(self) -> List[Order]:
        pass

    @abstractmethod
    def get_orders_by_user_id(self, user_id: int) -> List[Order]:
        pass
