from typing import List
from application.dtos.pizza_dto import PizzaUpdateDTO
from domain.interfaces.pizza_interface import PizzaInterface
from sqlalchemy.orm import Session
from fastapi import HTTPException

from domain.schemas import PizzaModel


class PizzaRepositoryImpl(PizzaInterface):
    def __init__(self, db_session: Session):
        self.db = db_session
    
    #def __exit__(self): # esto funcionara como destructor? -> No
    #    self.db.close() # cierra la sesion de la base de datos
        # que se instancia con el servicio

    def get_all_pizzas(self, db: Session) -> List[PizzaModel]:
        return self.db.query(PizzaModel).all()


    def create_pizza(self, db: Session, pizza: PizzaModel) -> PizzaModel:
        self.db.add(pizza)
        self.db.commit()
        self.db.refresh(pizza)
        return pizza
    
    # self.db y db refieren a la misma sesion pero db es la que se pasa como parametro y self.db es la que se inicializa en el constructor


    def get_pizza_by_id(self,db: Session, pizza_id: int) -> PizzaModel:
        return self.db.query(PizzaModel).filter(PizzaModel.id == pizza_id).first()

    def get_pizza_by_name(self, db: Session, name: str) -> PizzaModel:
        return self.db.query(PizzaModel).filter(PizzaModel.name == name).first()

    def get_pizza_images(self, db: Session, pizza_id: int) -> List[str]:
        return self.db.query(PizzaModel).filter(PizzaModel.id == pizza_id).first().images
    

    def update_pizza(self, db: Session, updated_pizza: PizzaModel) -> PizzaModel:
        pizza = self.db.query(PizzaModel).filter(PizzaModel.id == updated_pizza.id).first()

        if not pizza:
            return None
        
        for attr, val in updated_pizza.model_dump(exclude_unset=True).items():
            setattr(pizza, attr, val)

        self.db.commit()
        self.db.refresh(pizza)

        return pizza
    


    def delete_pizza(self, db: Session, pizza_id: int) -> bool:
        pizza = self.db.query(PizzaModel).filter(PizzaModel.id == pizza_id).first()
        if not pizza:
            return False
        self.db.delete(pizza)
        self.db.commit()
        return True


    def delete_duplicates(self, db: Session) -> bool:
        pizzas = self.db.query(PizzaModel).all()
        for pizza in pizzas:
            if self.db.query(PizzaModel).filter(PizzaModel.name == pizza.name).count() > 1:
                self.db.delete(pizza)
                self.db.commit()
        return True