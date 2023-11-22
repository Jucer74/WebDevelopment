from domain.schemas import IngredientModel, PizzaModel
from sqlalchemy.orm import Session

def create_mock_data(db: Session):
    ingredient1 = IngredientModel(name="Tomato Sauce", image="tomato_sauce.jpg")
    ingredient2 = IngredientModel(name="Mozzarella Cheese", image="mozzarella_cheese.jpg")
    ingredient3 = IngredientModel(name="Pepperoni", image="pepperoni.jpg")

    db.add_all([ingredient1, ingredient2, ingredient3])

    db.commit()

    pizza1 = PizzaModel(
        name="Pepperoni Pizza",
        description="A classic pepperoni pizza",
        price=10.99,
        ingredients=[ingredient1, ingredient2, ingredient3],
        images="pepperoni_pizza.jpg"
    )

    pizza2 = PizzaModel(
        name="Margarita Pizza",
        description="A classic margarita pizza",
        price=9.99,
        ingredients=[ingredient1, ingredient2],
        images="margarita_pizza.jpg"
    )

    # Add pizza to the database session
    db.add(pizza1)
    db.add(pizza2)

    # Commit the changes to the database
    db.commit()

