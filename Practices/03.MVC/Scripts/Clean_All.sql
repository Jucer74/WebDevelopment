-- ************* --
-- * Clean All * --
-- ************* --
DELETE FROM `pricatdb`.`Products` WHERE Id >= 0;
ALTER TABLE `pricatdb`.`Products` AUTO_INCREMENT = 1;
DELETE FROM `pricatdb`.`Categories` WHERE Id >= 0;
ALTER TABLE `pricatdb`.`Categories` AUTO_INCREMENT = 1;

-- ************** --
-- * Categories * --
-- ************** --
DELETE FROM `pricatdb`.`Categories` WHERE Id >= 0;
ALTER TABLE `pricatdb`.`Categories` AUTO_INCREMENT = 1;
INSERT INTO `pricatdb`.`Categories`(`Description`) VALUES('Alimentos');
INSERT INTO `pricatdb`.`Categories`(`Description`) VALUES('Bebidas');
INSERT INTO `pricatdb`.`Categories`(`Description`) VALUES('Productos de Aseo');
INSERT INTO `pricatdb`.`Categories`(`Description`) VALUES('Ropa');
INSERT INTO `pricatdb`.`Categories`(`Description`) VALUES('Medicamentos');

-- ************ --
-- * Products * --
-- ************ --
DELETE FROM `pricatdb`.`Products` WHERE Id >= 0;
ALTER TABLE `pricatdb`.`Products` AUTO_INCREMENT = 1;
INSERT INTO `pricatdb`.`Products` (`CategoryId`, `EanCode`, `Description`, `Unit`, `Price`)
VALUES ( 1, '7707548516286', 'Arroz', 'Lb', 500.00);
INSERT INTO `pricatdb`.`Products` (`CategoryId`, `EanCode`, `Description`, `Unit`, `Price`)
VALUES ( 1, '7707548941507', 'Papa', 'Lb', 1500.00);
INSERT INTO `pricatdb`.`Products` (`CategoryId`, `EanCode`, `Description`, `Unit`, `Price`)
VALUES ( 2, '7707548160274', 'Cocacola', 'Lb', 2500.00);
INSERT INTO `pricatdb`.`Products` (`CategoryId`, `EanCode`, `Description`, `Unit`, `Price`)
VALUES ( 2, '7707548110958', 'Pepsi', 'Und', 2500.00);
INSERT INTO `pricatdb`.`Products` (`CategoryId`, `EanCode`, `Description`, `Unit`, `Price`)
VALUES ( 3, '7707548758303', 'Detergente', 'Kg', 12500.00);
INSERT INTO `pricatdb`.`Products` (`CategoryId`, `EanCode`, `Description`, `Unit`, `Price`)
VALUES ( 3, '7707548210801', 'Cloro', 'CC', 21500.00);
INSERT INTO `pricatdb`.`Products` (`CategoryId`, `EanCode`, `Description`, `Unit`, `Price`)
VALUES ( 4, '7707548472247', 'Camisa', 'Und', 1500.00);
INSERT INTO `pricatdb`.`Products` (`CategoryId`, `EanCode`, `Description`, `Unit`, `Price`)
VALUES ( 4, '7707548427902', 'Pantalon', 'Und', 1500.00);
INSERT INTO `pricatdb`.`Products` (`CategoryId`, `EanCode`, `Description`, `Unit`, `Price`)
VALUES ( 5, '7707548799412', 'Jarabe para la Tos', 'Und', 32500.00);
INSERT INTO `pricatdb`.`Products` (`CategoryId`, `EanCode`, `Description`, `Unit`, `Price`)
VALUES ( 5, '7707548861546', 'Aspirina 500 mg x 20 Unidades', 'Caja', 42500.00);
