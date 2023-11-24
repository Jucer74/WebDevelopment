CREATE TABLE `moneybankdb`.`accounts` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `AccountType` VARCHAR(1) NOT NULL,
  `CreationDate` DATETIME NOT NULL,
  `AccountNumber` VARCHAR(10) NOT NULL,
  `OwnerName` VARCHAR(100) NOT NULL,
  `BalanceAmount` DECIMAL(18,2) NOT NULL,
  `OverdraftAmount` DECIMAL(18,2) NOT NULL,
  PRIMARY KEY (`Id`));