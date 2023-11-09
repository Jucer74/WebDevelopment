import React, { useState } from "react";

import Pepperoni_Img from "../Assets/Images/Menu/Pepperoni_Img.png";
import Carnes_Img from "../Assets/Images/Menu/Carnes_Img.jpg";
import Hawaiana_Img from "../Assets/Images/Menu/Hawaiana_Img.jpg";
import CuatroQuesos_Img from "../Assets/Images/Menu/CuatroQuesos_Img.jpg";

const Carrito = () => {
  const cards = [
    {
      name: "Pepperoni",
      img: Pepperoni_Img,
      desc: "Deliciosa pizza de pepperoni con queso mozzarella y salsa de tomate.",
      precio: 10,
      quantity: 5,
    },
    {
      name: "Carnes",
      img: Carnes_Img,
      desc: "Sabrosa pizza con jamón, salchicha y carne de res.",
      precio: 12,
      quantity: 6,
    },
    {
      name: "Hawaiana",
      img: Hawaiana_Img,
      desc: "Pizza tropical con jamón y piña, una combinación dulce y salada.",
      precio: 15,
      quantity: 1,
    },
    {
      name: "Cuatro Quesos",
      img: CuatroQuesos_Img,
      desc: "Pizza de queso, con mozzarella, cheddar, parmesano y queso azul.",
      precio: 14,
      quantity: false,
    },
  ];
  const [cartItems, setCartItems] = useState(cards);

  const handleQuantityChange = (index, value) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = value;
    setCartItems(newCartItems);
  };

  return (
    <section
      className="h-100"
      style={{ backgroundColor: "#fff", borderRadius: "5px" }}
    >
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="fw-bold mb-0 text-black">Carrito de Compras </h2>
            </div>

            {cartItems.map((item, index) => (
              <div key={index} className="card rounded-3 mb-4">
                <div className="card-body p-4">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img
                        src={item.img}
                        className="img-fluid rounded-3"
                        alt={item.name}
                      />
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <p className="lead fw-normal mb-2">{item.name}</p>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button
                        className="btn btn-link px-2"
                        onClick={() =>
                          handleQuantityChange(index, item.quantity - 1)
                        }
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <input
                        min="0"
                        name="quantity"
                        value={item.quantity}
                        type="number"
                        className="form-control form-control-sm"
                        readOnly
                      />
                      <button
                        className="btn btn-link px-2"
                        onClick={() =>
                          handleQuantityChange(index, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h5 className="mb-0">
                        ${item.precio * item.quantity}.00
                      </h5>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a href="#!" className="text-danger">
                        <i className="fas fa-trash fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <div>
                <button
                  class="btn btn-dark btn-block btn-lg"
                  style={{ marginBottom: "-1.5rem" }}
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#paymentModal"
                >
                  Realizar Pago
                </button>

                <div
                  class="modal fade"
                  id="paymentModal"
                  tabindex="-1"
                  aria-labelledby="paymentModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="paymentModalLabel">
                          Pago Realizado
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Cerrar"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <div class="d-flex justify-content-center">
                          <i class="fas fa-check-circle fa-5x text-success"></i>
                        </div>
                        <p class="text-center mt-3">
                          ¡Tu pago se ha realizado con éxito!
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carrito;
