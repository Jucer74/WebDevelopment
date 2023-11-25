CREATE TABLE `agentedeportivodb`.`Agente` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `Agente_deportivo_id` INT NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `gender` ENUM('M','F') NOT NULL,
    `Phone` VARCHAR(50)  NOT NULL,
    `Agent` VARCHAR(50) NOT NULL,
    `Country` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`Id`));

ALTER TABLE `agentedeportivodb`.`Agente`
ADD FOREIGN KEY (Agente_deportivo_id) REFERENCES AgenteDeportivo(Id);