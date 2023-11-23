-- DROP TABLE `agentsdb`.`sesions`;
-- DROP TABLE `agentsdb`.`users`;
-- DROP TABLE `agentsdb`.`agents`;

CREATE TABLE `agentsdb`.`Users` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `UserEmail` VARCHAR(300) NOT NULL,
  `FirstName`VARCHAR(50) NOT NULL,
  `LastName` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`Id`));
  
  CREATE TABLE `agentsdb`.`Agents`(
	`Id` INT NOT NULL AUTO_INCREMENT,
    `AgentEmail` VARCHAR(300) NOT NULL,
    `AgentName` VARCHAR (50) NOT NULL,
    `AgentLasName` VARCHAR(50) NOT NULL,
    PRIMARY KEY(`Id`));
    
    CREATE TABLE `agentsdb`.`sesions`(
		`Id` INT NOT NULL AUTO_INCREMENT,
		`User_Id` INT NOT NULL,
        `Agent_Id` INT NOT NULL,
        PRIMARY KEY (`Id`),
        FOREIGN KEY (`User_Id`) REFERENCES Users(`Id`),
        FOREIGN KEY (`Agent_Id`) REFERENCES Agents(`Id`)
    );