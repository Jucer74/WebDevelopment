// Importa los módulos y componentes necesarios
import React, { useState, useEffect } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Importa el hook useNavigate y Link de React Router
import backgroundImage from '../img/fondo.png';
import '../style/Home.css';
import asadohuilense from "../img/asadohuilense.png";
import bandejapaisa from "../img/bandejapaisa.png";
import chuleta from "../img/chuleta.png";

export const Home = () => {
    const [fadeIn, setFadeIn] = useState(false);
    const userId = localStorage.getItem("user_id");
    const storedUsername = localStorage.getItem('id_usuario');
    const navigate = useNavigate(); // Utiliza el hook useNavigate
    useEffect(() => {
        // Cambia la clase a 'fade-in' después de 10 segundos
        const timeout = setTimeout(() => {
            setFadeIn(true);
        }, 10000);

        return () => clearTimeout(timeout);
    }, []);

    const foodData = [
        {
            image: asadohuilense,
            description: "Departamento del Huila",
        },
        {
            image: chuleta,
            description: "Departamento del Valle del Cauca",
        },
        {
            image: bandejapaisa,
            description: "Departamento de Antioquia",
        },
        // Agrega más datos según sea necesario
    ];

    const handleCreateRecipe = () => {
        // Redirige a la página de creación de recetas al hacer clic en el botón
        navigate('/create');
    };

    return (
        <div className={`home-container ${fadeIn ? 'fade-in' : ''}`}>
            <Carousel
                id="carouselExample"
                interval={3000}
                className="carousel-fade"
            >
                {foodData.map((food, index) => (
                    <Carousel.Item key={index} className={index === 0 ? "active" : ""}>
                        <img
                            className="d-block w-100 full-screen-image"
                            src={food.image}
                            alt={food.description}
                        />
                        <Carousel.Caption>
                            <h3 className="carousel-caption-heading">{food.description}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="button-container">
                {/* Utiliza Link para redirigir a la página de creación */}
                <Link to="/create">
                    <Button variant="primary">Agregar nueva receta</Button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
