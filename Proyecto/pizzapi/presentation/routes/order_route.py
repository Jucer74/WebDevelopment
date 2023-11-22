from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi import Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from application.dtos.order_dto import OrderCreateDTO, OrderResponseDTO, OrderUpdateDTO
from application.dtos.pizza_dto import PizzaResponseDTO
from application.services.order_service import OrderService
from domain.models.order import StatusOrder
from infrastructure.dependencies import get_db
from infrastructure.repository_impl.order_repository import OrderRepositoryImpl
from infrastructure.repository_impl.pizza_repository import PizzaRepositoryImpl
from infrastructure.repository_impl.user_repository import UserRepositoryImpl
from presentation.routes.pizza_route import get_pizza_service


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
        # pizza_service = get_pizza_service(db)
        orders = order_service.get_all_orders(db)
        order_response_list = []

        for order in orders:
            pizzas = [PizzaResponseDTO(
                id=pizza.id,
                name=pizza.name,
                description=pizza.description,
                price=pizza.price,
                ingredients=[ingredient.name for ingredient in pizza.ingredients],
                images=pizza.images.replace("{","").replace("}","").split(',')
            ) for pizza in order.pizzas]

            order_response = OrderResponseDTO(
                id=order.id,
                user_id=order.user_id,
                pizzas=pizzas,
                total=order.total,
                created_at=order.created_at,
                updated_at=order.updated_at,
                status=order.status,
                address=order.address,
                phone=order.phone,
                payment_method=order.payment_method
            )

            order_response_list.append(order_response)

        return order_response_list
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Internal Server Error: {str(e)}"})
    

@router.get("/orders/{order_id}", response_model=OrderResponseDTO, tags=["Orders"])
async def get_order_by_id(order_id: int, db: Session = Depends(get_db)):
    order_service = get_order_service(db)
    try:
        order = order_service.get_order_by_id(db, order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        pizzas = [PizzaResponseDTO(
            id=pizza.id,
            name=pizza.name,
            description=pizza.description,
            price=pizza.price,
            ingredients=[ingredient.name for ingredient in pizza.ingredients],
            images=pizza.images.replace("{", "").replace("}", "").split(',')
        ) for pizza in order.pizzas]

        order_response = OrderResponseDTO(
            id=order.id,
            user_id=order.user_id,
            pizzas=pizzas,
            total=order.total,
            created_at=order.created_at,
            updated_at=order.updated_at,
            status=StatusOrder(order.status),  # Convert to StatusOrder enum
            address=order.address,
            phone=order.phone,
            payment_method=order.payment_method
        )

        return order_response
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error {str(e)}"})


@router.post("/orders/create", response_model=OrderResponseDTO, tags=["Orders"])
async def create_order(order_create_dto: OrderCreateDTO, db: Session = Depends(get_db)):
    try:
        order_service = get_order_service(db)
        order = order_service.create_order(db, order_create_dto)
        new_order = OrderResponseDTO(
            id=order.id,
            user_id=order.user_id,
            pizzas=order.pizzas,
            #[pizza.id for pizza in order.pizzas],  #map to id
            total=order.total,
            created_at=order.created_at,
            updated_at=order.updated_at,
            status=order.status,
            address=order.address,
            phone=order.phone,
            payment_method=order.payment_method
        )

        return new_order

        return order
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Internal Server Error: {str(e)}"})
    

@router.put("/orders/{order_id}", response_model=OrderResponseDTO, tags=["Orders"])
async def update_order(order_id: int, update_data: OrderUpdateDTO, db: Session = Depends(get_db)):
    try:
        order_service = get_order_service(db)
        order = order_service.update_order(db, order_id, update_data)

        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        return order
    
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error {str(e)}"})
    

@router.delete("/orders/{order_id}", response_model=bool, tags=["Orders"])
async def delete_order(order_id: int, db: Session = Depends(get_db)):
    try:
        order_service = get_order_service(db)
        order = order_service.get_order_by_id(db, order_id)
        
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        deleted = order_service.delete_order(db, order_id)
        
        if deleted:
            return True
        else:
            raise HTTPException(status_code=500, detail="Failed to delete order")
    except HTTPException as http_exception:
        raise http_exception
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error {str(e)}"})
    

@router.get("/users/{user_id}/orders", response_model=List[OrderResponseDTO], tags=["Orders"])
async def get_orders_by_user_id(user_id: int, db: Session = Depends(get_db)):
    try:
        order_service = get_order_service(db)
        orders = order_service.get_orders_by_user_id(db, user_id)
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
    

