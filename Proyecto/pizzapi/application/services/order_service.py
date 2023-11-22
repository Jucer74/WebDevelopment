from typing import List
from fastapi import HTTPException
from sqlalchemy.orm import Session
from domain.schemas import PizzaModel, UserModel, OrderModel
from application.dtos.order_dto import OrderCreateDTO, OrderResponseDTO, OrderUpdateDTO
from domain.interfaces.order_interface import OrderInterface
from infrastructure.repository_impl.order_repository import OrderRepositoryImpl
from infrastructure.repository_impl.pizza_repository import PizzaRepositoryImpl
from infrastructure.repository_impl.user_repository import UserRepositoryImpl


class OrderService:
    def __init__(self, order_repository: OrderRepositoryImpl, pizza_repository: PizzaRepositoryImpl, user_repository: UserRepositoryImpl):
        self.order_repository = order_repository
        self.pizza_repository = pizza_repository
        self.user_repository = user_repository

    
    def get_all_orders(self, db: Session) -> List[OrderModel]:
        return self.order_repository.get_all(db)
    
    def create_order(self, db: Session, order_data: OrderCreateDTO) -> OrderModel:
        pizzas = []
        for pizza_id in order_data.pizzas:
            pizza = self.pizza_repository.get_pizza_by_id(db, pizza_id)
            if pizza:
                pizzas.append(pizza)
        
        new_order = OrderModel(
            user_id = order_data.user_id,
            pizzas = pizzas,
            total = order_data.total,
            status = order_data.status,
            address = order_data.address,
            phone = order_data.phone,
            payment_method = order_data.payment_method
        )

        try:
            return self.order_repository.create(db, new_order)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error creating order: {str(e)}")
        

    def get_order_by_id(self, db: Session, order_id: int) -> OrderModel:
        return self.order_repository.get(db, order_id)
    
    def update_order(self, db: Session, order_id: int, order_data: OrderUpdateDTO) -> OrderModel:
        order = self.order_repository.get(db, order_id)
        if not order:
            return None
        
        for k,v in order_data.model_dump(exclude_unset=True).items():
            setattr(order, k, v)
            
        self.order_repository.update(db, order)
        return order
    

    def delete_order(self, db: Session, order_id: int) -> bool:
        return self.order_repository.delete(db, order_id)
    
    def get_orders_by_user_id(self, db: Session, user_id: int) -> List[OrderModel]:
        return self.order_repository.get_orders_by_user_id(db, user_id)
