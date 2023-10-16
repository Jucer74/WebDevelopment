CREATE DATABASE UsersDB;

USE UsersDB;

CREATE TABLE Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    Username VARCHAR(50) NOT NULL
);

SHOW TABLES; -- Ver tablas

-- Ahora, inserta datos en la tabla Users
INSERT INTO Users (Email, Name, Password, Username) 
VALUES
  ('Andres.Salazar@email.com', 'Andres Salazar', 'Password', 'ASalazar'),
  ('Jonathan.Asprilla@email.com', 'Jonathan Asprilla', 'Password', 'JAsprilla'),
  ('Julian.Paredes@email.com', 'Julian Paredes', 'Password', 'JParedes'),
  ('William.Aguirre@email.com', 'William Aguirre', 'Password', 'WAguirre'),
  ('Nicolás.Alvarez@email.com', 'Nicolás Alvarez', 'Password', 'Alvarez'),
  ('Maria.Carrero@email.com', 'Maria Carrero', 'Password', 'MCarrero'),
  ('Nicolas.Ortiz@email.com', 'Nicolas Ortiz', 'Password', 'NOrtiz'),
  ('Victor.Ospina@email.com', 'Victor Ospina', 'Password', 'VOspina'),
  ('Cristian.Osorio@email.com', 'Cristian Osorio', 'Password', 'COsorio'),
  ('Jeison.Garces@email.com', 'Jeison Garces', 'Password', 'JGarces'),
  ('Veronica.Tofino@email.com', 'Veronica Tofino', 'Password', 'VTofino'),
  ('Laura.Arango@email.com', 'Laura Arango', 'Password', 'LArango'),
  ('Juan.Hernandez@email.com', 'Juan Hernandez', 'Password', 'JHernandez'),
  ('Ivan.Valderrama@email.com', 'Ivan Valderrama', 'Password', 'IValderrama'),
  ('Diego.Galarza@email.com', 'Diego Galarza', 'Password', 'DGalarza'),
  ('Tania.Obando@email.com', 'Tania Obando', 'Password', 'TObando'),
  ('Jose.Melgarejo@email.com', 'Jose Melgarejo', 'Password', 'JMelgarejo'),
  ('Jhoan.Lozano@email.com', 'Jhoan Lozano', 'Password', 'JLozano'),
  ('Luis.Oviedo@email.com', 'Luis Oviedo', 'Password', 'LOviedo'),
  ('David.Hernandez@email.com', 'David Hernandez', 'Password', 'DHernandez');

SELECT * FROM Users;


CREATE USER 'admin'@'localhost' IDENTIFIED BY 'Admin123';
GRANT ALL PRIVILEGES ON UsersDB.* TO 'admin'@'localhost';
FLUSH PRIVILEGES; -- Crear nuevo usuario admin

SELECT user, host FROM mysql.user; -- Asi se ve si se creo el usuario

-- Activar autenticacion mixta
CREATE USER 'Admin'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'Admin123' REQUIRE NONE;
FLUSH PRIVILEGES;

DROP USER 'Angel'@'DESKTOP-HLFQO5A';
CREATE USER 'Angel'@'DESKTOP-HLFQO5A' IDENTIFIED BY 'Angel5836';
GRANT ALL PRIVILEGES ON UsersDB.* TO 'Angel'@'DESKTOP-HLFQO5A';
FLUSH PRIVILEGES;

