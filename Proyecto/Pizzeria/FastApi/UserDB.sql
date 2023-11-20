-- Crear un usuario
CREATE USER 'usuario_pizzeria'@'localhost' IDENTIFIED BY 'LaPizzeria';

-- Otorgar privilegios al usuario en la base de datos pizzeria
GRANT ALL PRIVILEGES ON pizzeria.* TO 'usuario_pizzeria'@'localhost';

-- Actualizar privilegios
FLUSH PRIVILEGES;
