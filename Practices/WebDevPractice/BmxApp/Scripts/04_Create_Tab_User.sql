CREATE TABLE `bmxdb`.`User` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(45) NOT NULL,
    `Email` VARCHAR(45) NOT NULL,
    `Password` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`Id`)
);