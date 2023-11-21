import React from "react";
import ListItem from "../../../components/ListItem/ListItem";
import "./AddToCart.css";
import image1 from "../../../assets/burger.jpg";
import image2 from "../../../assets/cheese.jpg";
import image3 from "../../../assets/cake.jpg";
import image4 from "../../../assets/coffee.jpg";
import image5 from "../../../assets/pizza.jpeg";
import image6 from "../../../assets/coffee.jpg";

const menuDataLeft = [
  {
    title: "cheese burger",
    description: "Ale & artichokes",
    price: 24,
    img: image1,
  },
  {
    title: "vegetarian pizza",
    description: "Mushroom ketchup & fries",
    price: 33.0,
    img: image2,
  },
  {
    title: "carrot soup",
    description: "best ingredients, all fresh",
    price: 12.0,
    img: image3,
  },
  {
    title: "pastries with fruits",
    description: "pretty pastries that hide a strawberry surprise inside",
    price: 6.0,
    img: image4,
  },
];

const menuDataRight = [
  {
    title: "coffee",
    description: "with yauco selecto beans(very exclusive)",
    price: 3.0,
    img: image6,
  },
  {
    title: "prosecco, jeio",
    description: "NV, Italy (O) 11|37",
    price: 33.0,
    img: image5,
  },
  {
    title: "pasta alla carbonara",
    description: "Luscious and wonderfully indulgent",
    price: 21.0,
    img: image1,
  },
  {
    title: "ricotta cheese",
    description: "with basil leaves and cherry tomatoes",
    price: 15.0,
    img: image2,
  },
];

const AddToCart = () => {
  return (
    <div className="container add-to-cart">
      <h1 className="heading-secondary">
        <span>click </span> to add to cart
      </h1>

      <div className="grid-container">
        <div>
          {menuDataLeft.map((data, i) => (
            <ListItem
              title={data.title}
              description={data.description}
              price={data.price}
              itemImage={data.img}
            />
          ))}
        </div>

        <div>
          {menuDataRight.map((data, i) => (
            <ListItem
              title={data.title}
              description={data.description}
              price={data.price}
              itemImage={data.img}
            />
          ))}
        </div>
      </div>


            <div className="addtocart-btn">
                <h1 className="heading-secondary">
                    <span>are you </span> done?
                </h1>

                <button>show cart & checkout</button>
            </div>

    </div>
  );
};

export default AddToCart;
