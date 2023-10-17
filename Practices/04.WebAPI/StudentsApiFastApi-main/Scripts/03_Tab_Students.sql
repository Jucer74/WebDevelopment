CREATE TABLE `studentsdb`.`Students` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(50) NOT NULL,
  `LastName`  VARCHAR(50) NULL,
  `DateOfBirth` DATETIME NOT NULL,
  `Sex` ENUM('M','F') NOT NULL,
  PRIMARY KEY (`Id`));