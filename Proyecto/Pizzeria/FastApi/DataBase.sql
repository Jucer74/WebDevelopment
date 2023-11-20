-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS pizzeria;
USE pizzeria;

-- Crear la tabla de categorias
CREATE TABLE IF NOT EXISTS categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    imagen_url VARCHAR(255),
    descripcion VARCHAR(255) NOT NULL
);

-- Crear la tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    categoria_id INT,
    imagen_url VARCHAR(255),
    nombre VARCHAR(255) NOT NULL,
    precio FLOAT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Insertar datos de ejemplo en la tabla de categorias
INSERT INTO categorias (imagen_url, descripcion) VALUES
    ('imagen1.jpg', 'Pizzas'),
    ('imagen2.jpg', 'Pastas'),
    ('imagen3.jpg', 'Lasañas');

-- Insertar datos de ejemplo en la tabla de productos
INSERT INTO productos (categoria_id, imagen_url, nombre, precio) VALUES
    (1, 'producto1.jpg', 'Pizza Margarita', 10.99),
    (1, 'producto2.jpg', 'Pizza Pepperoni', 15.99),
    (2, 'producto3.jpg', 'Pasta Alfredo', 12.99),
    (2, 'producto4.jpg', 'Pasta Bolognesa', 14.99),
    (3, 'producto5.jpg', 'Lasaña de Carne', 18.99),
    (3, 'producto6.jpg', 'Lasaña Vegetariana', 16.99);
