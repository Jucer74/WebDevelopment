CREATE TABLE `studentsdb`.`Students` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(50) NOT NULL,
  `LastName` VARCHAR(50) NOT NULL,
  `DateOfBirth` Datetime NOT NULL,
  `Sex` VARCHAR(1) NOT NULL,
  PRIMARY KEY (`Id`)
);
