// Home.js
import React, { useState, useEffect } from 'react';
import backgroundImage from '../img/fondo.png';
import '../style/Home.css';

export const Home = () => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        // Cambia la clase a 'fade-in' después de 10 segundos
        const timeout = setTimeout(() => {
            setFadeIn(true);
        }, 10000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`home-container ${fadeIn ? 'fade-in' : ''}`}>
            
            <img
                src={backgroundImage}
                alt="Imagen de fondo"
                className="full-screen-image"
            />
        </div>
    );
};

export default Home;
