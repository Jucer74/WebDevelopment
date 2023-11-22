
from application.dtos.order_dto import OrderCreateDTO, OrderResponseDTO, OrderUpdateDTO
from typing import List
from sqlalchemy.orm import Session
from domain.interfaces.order_interface import OrderInterface
from domain.schemas import OrderModel


class OrderRepositoryImpl(OrderInterface):
    def __init__(self, db_session: Session):
        self.db_session = db_session
    
    def get_all(self, db: Session) -> List[OrderModel]:
        return db.query(OrderModel).all()
    

    def create(self, db: Session, order: OrderModel) -> OrderResponseDTO:
        self.db.add(order)
        self.db.commit()
        self.db.refresh(order)
        return order
    
    # refiere a get_by_id, order_metodo:
    # quise probar otra notacion a ver
    # como cambia la legibilidad

    def get(self, db: Session, order_id: int) -> OrderResponseDTO:
        return db.query(OrderResponseDTO).filter(OrderResponseDTO.id == order_id).first()
    

    def get_orders_by_user_id(self, db: Session, user_id: int) -> List[OrderResponseDTO]:
        return db.query(OrderModel).filter(OrderResponseDTO.user_id == user_id).all()
    

    def update(self, db: Session, order: OrderUpdateDTO) -> OrderResponseDTO:
        order = db.query(OrderModel).filter(OrderModel.id == order.id).first()

        if not order:
            return None
        
        for k,v in order.model_dump(exclude_unset=True).items():
            setattr(order, k, v)
            
        self.db.commit()
        self.db.refresh(order)
        return order
    

    def delete(self, db: Session, order_id: int) -> bool:
        order = db.query(OrderModel).filter(OrderModel.id == order_id).first()
        if not order:
            return False
        
        print(str(self.db.query(OrderModel).filter(OrderModel.id == order_id).delete()))

        self.db.delete(order)
        self.db.commit()
        return True
