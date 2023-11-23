INSERT INTO `bancausb`.`Users` (`UserEmail`, `FirstName`, `LastName`, `Password`, `Role`) VALUES 
('Admin@email.com', 'Admin', 'BancaUSB', 'Password*01', 'administrador'),
('cliente1@email.com', 'Cliente', 'Uno', 'contraseña1', 'cliente'),
('cliente2@email.com', 'Cliente', 'Dos', 'contraseña2', 'cliente'),
('cliente3@email.com', 'Cliente', 'Tres', 'contraseña3', 'cliente');

INSERT INTO `bancausb`.`Products` (`Name`)
VALUES 
('Cuenta de Ahorro'),
('Cuenta Corriente'),
('Inversión a Plazo Fijo'),
('Tarjeta de Débito'),
('Tarjeta de Crédito'),
('Préstamo Hipotecario'),
('Préstamo Personal'),
('Seguro de Vida'),
('Seguro de Automóvil'),
('Fondo de Inversión');

INSERT INTO `bancausb`.`UserProducts` (`UserId`, `ProductId`)
VALUES 
(2, 1),
(2, 4),
(3, 2),
(3, 5),
(4, 3),
(4, 6);

select * from `bancausb`.`Users`;
select * from `bancausb`.`Products`;

SELECT  Users.FirstName, Users.LastName, Products.Name AS ProductName
FROM `bancausb`.`UserProducts`
JOIN `bancausb`.`Users` ON UserProducts.UserId = Users.Id
JOIN `bancausb`.`Products` ON UserProducts.ProductId = Products.Id;