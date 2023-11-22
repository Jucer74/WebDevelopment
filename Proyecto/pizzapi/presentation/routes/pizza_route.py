
from typing import List
from fastapi import Depends, HTTPException
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from application.dtos.pizza_dto import PizzaCreateDTO, PizzaResponseDTO, PizzaUpdateDTO
from application.services.pizza_service import PizzaService

from infrastructure.dependencies import get_db
from infrastructure.repository_impl.ingredient_repository import IngredientRepositoryImpl
from infrastructure.repository_impl.pizza_repository import PizzaRepositoryImpl
from mockdata import create_mock_data


router = APIRouter()


@router.post("/pizza/create_mock_data", tags=["Pizzas"])
def populate_mock_data(db: Session = Depends(get_db)):
    try:
        create_mock_data(db)
        return {"message": "Pizza mock data created successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating mock data: {str(e)}")




def get_pizza_service(db: Session = Depends(get_db)) -> PizzaService:
    pizza_repository = PizzaRepositoryImpl(db_session=db)  #
    ingredient_repository = IngredientRepositoryImpl(db_session=db) 
    return PizzaService(pizza_repository=pizza_repository, ingredient_repository=ingredient_repository)




@router.get("/pizzas", response_model = List[PizzaResponseDTO],tags=["Pizzas"])
async def get_pizzas(db: Session = Depends(get_db)):
    try:
        pizza_service = get_pizza_service(db)
        pizzas = pizza_service.get_all_pizzas(db)
        
        pizza_response_list = [PizzaResponseDTO(
            id=pizza.id,
            name=pizza.name,
            description=pizza.description,
            ingredients=[ingredient.id for ingredient in pizza.ingredients],  #map to id
            images=pizza.images.replace("{","").replace("}","").split(','),
            price=pizza.price
        ) for pizza in pizzas]

        return pizza_response_list
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Internal Server Error: {str(e)}"})


@router.get("/pizzas/{pizza_id}", response_model=PizzaResponseDTO, tags=["Pizzas"])
async def get_pizza_by_id(pizza_id: int, db: Session = Depends(get_db)):
    pizza_service = get_pizza_service(db)
    try:
        pizza = pizza_service.get_pizza_by_id(db, pizza_id)
        if not pizza:
            raise HTTPException(status_code=404, detail="Pizza not found")
        
        pizza_response = PizzaResponseDTO(
            id=pizza.id,
            name=pizza.name,
            description=pizza.description,
            ingredients=[ingredient.id for ingredient in pizza.ingredients],  #map to id
            images=pizza.images.replace("{","").replace("}","").split(','),
            price=pizza.price
        )
        return pizza_response

    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error {str(e)}"})
    

@router.post("/pizzas/create", response_model=PizzaResponseDTO, tags=["Pizzas"])
async def create_pizza(pizza_create_dto: PizzaCreateDTO, db: Session = Depends(get_db)):
    try:
        pizza_service = get_pizza_service(db)
        pizza_e = pizza_service.get_pizza_by_name(db, pizza_create_dto.name)
        if pizza_e:
            raise HTTPException(status_code=400, detail="Pizza already exists")
        pizza = pizza_service.create_pizza(db, pizza_create_dto)
        new_pizza = PizzaResponseDTO(
            id=pizza.id,
            name=pizza.name,
            description=pizza.description,
            ingredients=[ingredient.id for ingredient in pizza.ingredients],  #map to id
            images=pizza.images.replace("{","").replace("}","").split(','),
            price=pizza.price
        )
        return new_pizza
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Internal Server Error: {str(e)}"})
    

@router.put("/pizzas/{pizza_id}", response_model=PizzaResponseDTO, tags=["Pizzas"])
async def update_pizza(pizza_id: int, pizza_update_dto: PizzaUpdateDTO, db: Session = Depends(get_db)):
    pizza_service = get_pizza_service(db)
    try:
        pizza = pizza_service.update_pizza(db, pizza_id, pizza_update_dto)
        if not pizza:
            raise HTTPException(status_code=404, detail="Pizza not found")
        else:
            return pizza
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error {str(e)}"})
    

@router.delete("/pizzas/{pizza_id}", response_model=bool, tags=["Pizzas"])
async def delete_pizza(pizza_id: int, db: Session = Depends(get_db)):
    pizza_service = get_pizza_service(db)
    try:
        return pizza_service.delete_pizza(db, pizza_id)
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error {str(e)}"})