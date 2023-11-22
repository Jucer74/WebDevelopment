from datetime import datetime
from domain.models.order import StatusOrder
from domain.schemas import IngredientModel, OrderModel, PizzaModel, UserModel
from sqlalchemy.orm import Session

def create_mock_data(db: Session):
    ingredient1 = IngredientModel(name="Tomato Sauce", image="tomato_sauce.jpg")
    ingredient2 = IngredientModel(name="Mozzarella Cheese", image="mozzarella_cheese.jpg")
    ingredient3 = IngredientModel(name="Pepperoni", image="pepperoni.jpg")
    ingredient4 = IngredientModel(name="Mushrooms", image="mushrooms.jpg")

    db.add_all([ingredient1, ingredient2, ingredient3, ingredient4])

    db.commit()

    mock_pizzas = [
        PizzaModel(
            name="Pepperoni Pizza",
            description="A classic pepperoni pizza",
            price=10.99,
            ingredients=[ingredient1, ingredient2, ingredient3],
            images="pepperoni_pizza.jpg"
        ),
        PizzaModel(
            name="Margarita Pizza",
            description="A classic margarita pizza",
            price=9.99,
            ingredients=[ingredient1, ingredient2],
            images="margarita_pizza.jpg"
        )
    ]

    for pizza in mock_pizzas:
        if not db.query(PizzaModel).filter(PizzaModel.name == pizza.name).first():
            db.add(pizza)


    mock_orders = [
        OrderModel(
            user_id=1,
            pizzas=[mock_pizzas[0]],
            total=mock_pizzas[0].price,
            created_at=datetime.now(),
            updated_at=datetime.now(),
            status="PENDING",#str(StatusOrder.PENDING),
            address="123 Main St",
            phone="555-123-4567",
            payment_method="Credit Card"
        ),
        OrderModel(
            user_id=2,
            pizzas=[mock_pizzas[1]],
            total=mock_pizzas[1].price,
            created_at=datetime.now(),
            updated_at=datetime.now(),
            status="PREPARING",
            address="321 Second St",
            phone="555-987-6543",
            payment_method="Cash"
        )
    ]

    for order in mock_orders:
        if not db.query(OrderModel).filter(OrderModel.address == order.address).first():
            db.add(order)


    users_data = [
        {
            "name": "Mikasa",
            "last_name": "Ackerman",
            "email": "mikasa@gmail.com",
            "is_active": True,
            "phone": "987654",
            "hashed_password": "eren"
        },
        {
            "name": "Armin",
            "last_name": "Arlert",
            "email": "armin@gmail.com",
            "is_active": True,
            "phone": "123456",
            "hashed_password": "colossal"
        },
        {
            "name": "Levi",
            "last_name": "Ackerman",
            "email": "levi@gmail.com",
            "is_active": True,
            "phone": "567890",
            "hashed_password": "cleanfreak"
        },
        {
            "name": "Historia",
            "last_name": "Reiss",
            "email": "historia@gmail.com",
            "is_active": True,
            "phone": "345678",
            "hashed_password": "queen"
        }
    ]

    for user in users_data:
        if not db.query(UserModel).filter(UserModel.email == user["email"]).first():
            db.add(UserModel(**user))

    

    db.commit()

