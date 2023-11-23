CREATE TABLE `bancausb`.`Users` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `UserEmail` VARCHAR(300) NOT NULL UNIQUE,
  `FirstName` VARCHAR(50) NOT NULL,
  `LastName` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(50) NOT NULL,
  `Role` ENUM('cliente', 'administrador') NOT NULL DEFAULT 'cliente',
   PRIMARY KEY (`Id`)
);

CREATE TABLE `bancausb`.`Products` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`Id`));
  
CREATE TABLE `bancausb`.`UserProducts` (
  `UserId` INT NOT NULL,
  `ProductId` INT NOT NULL,
  PRIMARY KEY (`UserId`, `ProductId`),
  FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`),
  FOREIGN KEY (`ProductId`) REFERENCES `Products`(`Id`)
);
