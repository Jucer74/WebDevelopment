CREATE TABLE `realestatedb`.`realestatecategory` (
    `Id` INT NOT NULL AUTO_INCREMENT,
    `RealestateId` INT NOT NULL,
    `URLImagen` VARCHAR(250) NOT NULL,
    `Description` VARCHAR(50) NOT NULL,
    `Address` VARCHAR(50) NOT NULL,
    `Location` VARCHAR(50) NOT NULL,
    `Price` INT NOT NULL,
    `Rooms` INT NOT NULL,
    `Bathrooms` INT NOT NULL,
    `BuiltArea` INT NOT NULL,
    `Stratum` INT NOT NULL,
    `Contact` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`Id`));
    
ALTER TABLE `realestatedb`.`realestatecategory`
ADD FOREIGN KEY (RealestateId) REFERENCES realestate(Id);
