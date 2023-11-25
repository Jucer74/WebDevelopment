CREATE TABLE `RecipesDB`.`Recipes` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `CategoryId` INT NOT NULL,
  `Name` VARCHAR(70) NOT NULL,
  `Ingredients` VARCHAR(255) NOT NULL,
  `Difficulty` VARCHAR(50) NOT NULL,
  `EstimatedTime` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`Id`));
  
  ALTER TABLE `RecipesDB`.`Recipes`
  ADD FOREIGN KEY (CategoryId) REFERENCES Categories(Id);