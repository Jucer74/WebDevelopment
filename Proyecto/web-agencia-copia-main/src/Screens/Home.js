import React from "react";
import { Link } from "react-scroll";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div name="Home" className={styles.home}>
      <div className={styles.titleContainer}>
        <p>
        Tu camino, nuestro vehículo:<br />
          <b> Viaja con libertad.</b>
        </p>
        <p>
        Renta tu libertad <br />
          <b> sobre ruedas.</b>
        </p>
      </div>
      <div className={styles.ctaContainer}>
        <Link
          to="Contact"
          smooth
          duration={500}
          className={styles.callToAction}
        >
          Contactanos
        </Link>

        
        <Link
          to="Contact"
          smooth
          duration={500}
          className={styles.callToAction}
        >
          Get a Quote
        </Link>
      </div>
    </div>
  );
};

export default Home;
