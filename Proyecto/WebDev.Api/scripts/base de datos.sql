CREATE DATABASE `accountbank`;
CREATE USER 'accountuser'@'localhost' IDENTIFIED BY 'M0n3yB4nkUs3r*01';
GRANT ALL PRIVILEGES ON *.* TO 'accountuser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
CREATE TABLE `accountbank`.`accounts` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `AccountType` VARCHAR(1) NOT NULL,
  `CreationDate` DATETIME NOT NULL,
  `AccountNumber` VARCHAR(10) NOT NULL,
  `OwnerName` VARCHAR(100) NOT NULL,
  `BalanceAmount` DECIMAL(18,2) NOT NULL,
  `OverdraftAmount` DECIMAL(18,2) NOT NULL,
PRIMARY KEY (`Id`));

CREATE TABLE `accountbank`.`users` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Email` VARCHAR(255) NOT NULL,
  `Name` VARCHAR(255) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `Username` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `accountbank`.`transactions` (
  `TransactionId` INT NOT NULL AUTO_INCREMENT,
  `AccountId` INT NOT NULL,
  `Amount` DECIMAL(18,2) NOT NULL,
  `TransactionType` VARCHAR(255) NOT NULL,
  `TransactionDate` DATETIME NOT NULL,
  PRIMARY KEY (`TransactionId`)
);


INSERT INTO `accountbank`.`accounts` VALUES
    (1, 'C', '2023-06-30 00:00:00', 3016892501, 'Yurley Orejuela Ramirez', 1500000.00, 0.00),
    (2, 'A', '2023-07-23 00:00:00', 5263418932, 'Libia Oquenda', 250000.00, 0.00),
    (3, 'C', '2023-08-25 00:00:00', 6703001327, 'John Fredy Vásquez Izquierdo', 50000.00, 950000.00),
    (4, 'S', '2023-09-12 00:00:00', 4085721934, 'Ana María García', 120000.00, 0.00),
    (5, 'C', '2023-10-05 00:00:00', 7530192846, 'Carlos Torres', 300000.00, 0.00),
    (6, 'A', '2023-11-18 00:00:00', 9024763158, 'Isabel Salazar', 80000.00, 0.00),
    (7, 'S', '2023-12-01 00:00:00', 1652387940, 'Juan Manuel González', 50000.00, 0.00),
    (8, 'C', '2024-01-09 00:00:00', 2874615902, 'Patricia Rodríguez', 1000000.00, 0.00),
    (9, 'A', '2024-02-14 00:00:00', 6093847215, 'Andrés López', 150000.00, 0.00),
    (10, 'S', '2024-03-20 00:00:00', 8745139026, 'Laura Pérez', 75000.00, 0.00),
    (11, 'C', '2024-04-22 00:00:00', 1265983470, 'Miguel Sánchez', 500000.00, 0.00),
    (12, 'A', '2024-05-30 00:00:00', 3509146827, 'María Fernanda', 200000.00, 0.00),
    (13, 'S', '2024-06-15 00:00:00', 5927361048, 'Sebastián Gómez', 90000.00, 0.00),
    (14, 'C', '2024-07-07 00:00:00', 7012495836, 'Catalina Ramírez', 400000.00, 0.00),
    (15, 'A', '2024-08-11 00:00:00', 9351874620, 'Javier Herrera', 120000.00, 0.00),
    (16, 'S', '2024-09-25 00:00:00', 1048562973, 'Daniela Mendoza', 60000.00, 0.00),
    (17, 'C', '2024-10-30 00:00:00', 2374658194, 'Felipe Castro', 700000.00, 0.00),
    (18, 'A', '2024-11-12 00:00:00', 4785126930, 'Valentina Ruiz', 180000.00, 0.00),
    (19, 'S', '2024-12-18 00:00:00', 6098234715, 'Ricardo Gutiérrez', 30000.00, 0.00),
    (20, 'C', '2025-01-02 00:00:00', 8153946207, 'Camila Arango', 900000.00, 0.00),
    (21, 'A', '2025-02-14 00:00:00', 1308759642, 'Luisa González', 250000.00, 0.00),
    (22, 'S', '2025-03-20 00:00:00', 2746158390, 'Eduardo Ramírez', 45000.00, 0.00),
    (23, 'C', '2025-04-22 00:00:00', 5067984123, 'Sandra Martínez', 800000.00, 0.00),
    (24, 'A', '2025-05-30 00:00:00', 7392816504, 'Martín Ríos', 160000.00, 0.00),
    (25, 'S', '2025-06-15 00:00:00', 8913542076, 'Natalia Sánchez', 70000.00, 0.00),
    (26, 'C', '2025-07-07 00:00:00', 1049268375, 'Andrea López', 600000.00, 0.00),
    (27, 'A', '2025-08-11 00:00:00', 2375649812, 'Diego Herrera', 200000.00, 0.00),
    (28, 'S', '2025-09-25 00:00:00', 4893126750, 'Isabella Gómez', 35000.00, 0.00),
    (29, 'C', '2025-10-30 00:00:00', 6127358941, 'Mateo Castro', 800000.00, 0.00),
    (30, 'A', '2025-11-12 00:00:00', 7584913620, 'Alejandra Ruiz', 140000.00, 0.00),
    (31, 'S', '2025-12-18 00:00:00', 9036241758, 'Gabriel Gutiérrez', 40000.00, 0.00),
    (32, 'C', '2026-01-02 00:00:00', 1453872960, 'Sofía Arango', 950000.00, 0.00),
    (33, 'C', '2023-11-23 00:00:00', 8218146205, 'jaime cardona', 100000.00, 100.00);


INSERT INTO `accountbank`.`users` VALUES
    (1, 'Andres.Salazar@email.com', 'Andres Salazar', 'Password', 'ASalazar'),
    (2, 'Jonathan.Asprilla@email.com', 'Jonathan Asprilla', 'Password', 'JAsprilla'),
    (3, 'Julian.Paredes@email.com', 'Julian Paredes', 'Password', 'JParedes'),
    (4, 'William.Aguirre@email.com', 'William Aguirre', 'Password', 'WAguirre'),
    (5, 'Nicolás.Alvarez@email.com', 'Nicolás Alvarez', 'Password', 'Alvarez'),
    (6, 'Maria.Carrero@email.com', 'Maria Carrero', 'Password', 'MCarrero'),
    (7, 'Nicolas.Ortiz@email.com', 'Nicolas Ortiz', 'Password', 'NOrtiz'),
    (8, 'Victor.Ospina@email.com', 'Victor Ospina', 'Password', 'VOspina'),
    (9, 'Cristian.Osorio@email.com', 'Cristian Osorio', 'Password', 'COsorio'),
    (10, 'Jeison.Garces@email.com', 'Jeison Garces', 'Password', 'JGarces'),
    (11, 'Veronica.Tofino@email.com', 'Veronica Tofino', 'Password', 'VTofino'),
    (12, 'Laura.Arango@email.com', 'Laura Arango', 'Password', 'LArango'),
    (13, 'Juan.Hernandez@email.com', 'Juan Hernandez', 'Password', 'JHernandez'),
    (14, 'Ivan.Valderrama@email.com', 'Ivan Valderrama', 'Password', 'IValderrama'),
    (15, 'Diego.Galarza@email.com', 'Diego Galarza', 'Password', 'DGalarza'),
    (16, 'Tania.Obando@email.com', 'Tania Obando', 'Password', 'TObando'),
    (17, 'Jose.Melgarejo@email.com', 'Jose Melgarejo', 'Password', 'JMelgarejo'),
    (18, 'Jhoan.Lozano@email.com', 'Jhoan Lozano', 'Password', 'JLozano'),
    (19, 'Luis.Oviedo@email.com', 'Luis Oviedo', 'Password', 'LOviedo'),
    (20, 'David.Hernandez@email.com', 'David Hernandez', 'Password', 'DHernandez'),
    (21, 'jaimeandrescardonam@gmail.com', 'jaime cardona', '123456', 'jacardonam3');

INSERT INTO `accountbank`.`transactions` (`AccountId`, `Amount`, `TransactionType`, `TransactionDate`) VALUES
(1, 50000.50, 'Deposit', '2023-01-01 08:00:00'),
(5, 25000.75, 'Withdrawal', '2023-01-02 10:30:00'),
(10, 100000.00, 'Deposit', '2023-01-03 12:45:00'),
(15, 75200.00, 'Withdrawal', '2023-01-04 14:15:00'),
(20, 150300.00, 'Deposit', '2023-01-05 16:30:00'),
(25, 120500.00, 'Withdrawal', '2023-01-06 18:45:00'),
(30, 80000.00, 'Deposit', '2023-01-07 20:00:00'),
(3, 60750.75, 'Withdrawal', '2023-01-08 22:15:00'),
(8, 180250.00, 'Deposit', '2023-01-09 09:30:00'),
(12, 90500.50, 'Withdrawal', '2023-01-10 11:45:00');


