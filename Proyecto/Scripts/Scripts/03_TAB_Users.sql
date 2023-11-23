CREATE TABLE `citasmedicasbd`.`Especializacion` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `citasmedicasbd`.`Medicos` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `UserEmail` VARCHAR(300) NOT NULL UNIQUE,
  `FirstName` VARCHAR(50) NOT NULL,
  `LastName` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(50) NOT NULL,
  `EspecializacionId` INT NOT NULL,
  FOREIGN KEY (`EspecializacionId`) REFERENCES `Especializacion`(`Id`),
  PRIMARY KEY (`Id`)
);
