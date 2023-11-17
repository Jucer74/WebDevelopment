import React from "react";
import styles from "./Car.module.css";

const Car = () => {
  return (
    <div name="Car" className={styles.car}>
      <p>We solve your company's problems by creating amazing web pages.</p>
      <img
        className={styles.webImage}
        src={require("../assets/webImage.jpg")}
      ></img>
    </div>
  );
};

export default Car;
