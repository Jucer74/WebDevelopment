import React from "react";
import styles from "./Car.module.css";

const Car = () => {
  return (
    <div name="Car" className={styles.car}>
      <p>Carros destacados</p>
      <img
        className={styles.webImage}
        src={require("../assets/webImage.jpg")}
      ></img>
    </div>
  );
};

export default Car;
