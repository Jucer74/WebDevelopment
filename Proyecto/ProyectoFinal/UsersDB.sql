CREATE DATABASE UsersDB;

USE UsersDB;

CREATE TABLE Users (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    Name VARCHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    Username VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.0,
    account_type ENUM('Checking', 'Savings') NOT NULL
);

CREATE TABLE transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_type ENUM('Deposit', 'Withdrawal') NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_path VARCHAR(255),
     FOREIGN KEY (user_id) REFERENCES Users(Id) ON DELETE CASCADE
);

SHOW TABLES; -- Ver tablas

SET foreign_key_checks = 0;
DROP TABLE transactions; -- Eliminar tablas
SET foreign_key_checks = 1;
  
DELETE FROM Users WHERE id = 6;

SELECT * FROM users;
SELECT * FROM transactions;

DELETE FROM Users WHERE id = 8;

ALTER TABLE Users
ADD COLUMN address VARCHAR(255);
ALTER TABLE Users
ADD COLUMN city VARCHAR(100);
ALTER TABLE Users
ADD COLUMN balance DECIMAL(10, 2) DEFAULT 0.0;
ALTER TABLE Users
ADD COLUMN account_type ENUM('Checking', 'Savings') NOT NULL;
ALTER TABLE transactions
ADD COLUMN image_path VARCHAR(255);