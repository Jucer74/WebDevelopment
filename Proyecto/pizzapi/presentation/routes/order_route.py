from fastapi import APIRouter, Depends, HTTPException, status
from fastapi import Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from application.dtos.order_dto import OrderCreateDTO, OrderResponseDTO, OrderUpdateDTO
from application.services.order_service import OrderService
from infrastructure.dependencies import get_db
from infrastructure.repository_impl.order_repository import OrderRepositoryImpl
from infrastructure.repository_impl.pizza_repository import PizzaRepositoryImpl
from infrastructure.repository_impl.user_repository import UserRepositoryImpl


router = APIRouter()


def get_order_service(db: Session = Depends(get_db)) -> OrderService:
    order_repository = OrderRepositoryImpl(db_session=db)  # 
    pizza_repository = PizzaRepositoryImpl(db_session=db) 
    user_repository = UserRepositoryImpl(db_session=db) 
    return OrderService(order_repository=order_repository, pizza_repository=pizza_repository, user_repository=user_repository)


@router.get("/orders", response_model = List[OrderResponseDTO],tags=["Orders"])
async def get_orders(db: Session = Depends(get_db)):
    try:
        order_service = get_order_service(db)
        orders = order_service.get_all_orders(db)
        order_response_list = [OrderResponseDTO(
            id=order.id,
            user_id=order.user_id,
            pizzas=[pizza.id for pizza in order.pizzas],  #map to id
            total=order.total,
            created_at=order.created_at,
            updated_at=order.updated_at,
            status=order.status,
            address=order.address,
            phone=order.phone,
            payment_method=order.payment_method
        ) for order in orders]

        return order_response_list
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Internal Server Error: {str(e)}"})