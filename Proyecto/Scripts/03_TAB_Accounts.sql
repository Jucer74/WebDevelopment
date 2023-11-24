-- DROP TABLE `agentsdb`.`sesions`;
-- DROP TABLE `agentsdb`.`users`;
-- DROP TABLE `agentsdb`.`agents`;

CREATE TABLE `librerydb`.`Users` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `UserEmail` VARCHAR(300) NOT NULL,
  `FirstName`VARCHAR(50) NOT NULL,
  `LastName` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`Id`));
  
  CREATE TABLE `librerydb`.`Libros`(
	`Id` INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(50) NOT NULL,
    PRIMARY KEY(`Id`));
    
    CREATE TABLE `librerydb`.`reservas`(
		`User_Id` INT NOT NULL,
        `Libros_Id` INT NOT NULL,
        PRIMARY KEY (`User_Id`,`Libros_Id`),
        FOREIGN KEY (`User_Id`) REFERENCES Users(`Id`),
        FOREIGN KEY (`Libros_Id`) REFERENCES Libros(`Id`)
    );
    