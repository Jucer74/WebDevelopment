from sqlalchemy import Column, Integer, String, Boolean, Float, Table, ForeignKey
from sqlalchemy.orm import declarative_base, relationship, declarative_base


Base = declarative_base()

class UserModel(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)
    name = Column(String(50), nullable = False)
    last_name = Column(String(50), nullable = False)
    email = Column(String(50), unique=True, index=True, nullable = False)
    hashed_password = Column(String(255), nullable = False)
    is_active = Column(Boolean, default=True)
    phone = Column(String(50), nullable = True)

    class Config:
        orm_mode = True
        from_attributes = True


class IngredientModel(Base):
    __tablename__ = "ingredients"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(50))
    pizza_id = Column(Integer, ForeignKey("pizzas.id"))
    pizza = relationship("PizzaModel", back_populates="ingredients")
    image = Column(String(300), nullable = True)

    class Config:
        orm_mode = True
        from_attributes = True


class PizzaModel(Base):
    __tablename__ = "pizzas"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(50))
    description = Column(String(80))
    ingredients = relationship("IngredientModel", back_populates="pizza")
    images = Column(String(1000)) # if not list, then string then split ?
    price = Column(Float)

    class Config:
        orm_mode = True
        from_attributes = True

# Ordenes: many to many order-pizza
order_pizza_association = Table('order-pizza', Base.metadata,
    Column('order_id', Integer, ForeignKey('orders.id')),
    Column('pizza_id', Integer, ForeignKey('pizzas.id'))
)

class OrderModel(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    pizzas = relationship("PizzaModel", secondary=order_pizza_association)
    total = Column(Float)
    status = Column(String(50))
    address = Column(String(50))
    phone = Column(String(50))
    payment_method = Column(String(50))
    created_at = Column(String(50))
    updated_at = Column(String(50)) 

class Config:
    orm_mode = True
    from_attributes = True


                    
