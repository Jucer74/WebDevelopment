CREATE TABLE `zenvoyagesdb`.`accounts` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `UserEmail` VARCHAR(300) NOT NULL,
  `FirstName` VARCHAR(50) NOT NULL,
  `LastName` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`Id`));
  
  CREATE TABLE `zenvoyagesdb`.`clients` (
  `ClientId` INT NOT NULL AUTO_INCREMENT,
  `AccountId` INT NOT NULL,
  `Address` VARCHAR(100),
  `City` VARCHAR(50),
  `Country` VARCHAR(50),
  `PhoneNumber` VARCHAR(20),
  `Preferences` TEXT,
  PRIMARY KEY (`ClientId`),
  FOREIGN KEY (`AccountId`) REFERENCES `accounts`(`Id`)
);

CREATE TABLE `zenvoyagesdb`.`destinations` (
  `DestinationId` INT NOT NULL AUTO_INCREMENT,
  `DestinationName` VARCHAR(100) NOT NULL,
  `City` VARCHAR(50),
  `Country` VARCHAR(50),
  `Amount` DECIMAL(18,2),
  `Description` TEXT,
  `DestinationType` VARCHAR(50),
  PRIMARY KEY (`DestinationId`)
);

CREATE TABLE `zenvoyagesdb`.`bookings` (
  `BookingId` INT NOT NULL AUTO_INCREMENT,
  `ClientId` INT NOT NULL,
  `DestinationId` INT NOT NULL,
  `BookingDate` DATE,
  `TotalAmount` DECIMAL(18,2),
  PRIMARY KEY (`BookingId`),
  FOREIGN KEY (`ClientId`) REFERENCES `clients`(`ClientId`),
  FOREIGN KEY (`DestinationId`) REFERENCES `destinations`(`DestinationId`)
);
