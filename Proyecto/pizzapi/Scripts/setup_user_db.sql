CREATE DATABASE IF NOT EXISTS 

CREATE USER 'pizza_admin'@'localhost' IDENTIFIED BY 'p4ssw0rd*01';
GRANT ALL PRIVILEGES ON pizzadb.* TO 'pizza_admin'@'localhost';
FLUSH PRIVILEGES;

COMMIT
