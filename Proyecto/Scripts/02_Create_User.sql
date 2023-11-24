/*DROP USER 'pizzashopuser'@'localhost' ;*/
CREATE USER 'libreryuser'@'localhost' IDENTIFIED BY 'Admin123';
GRANT ALL PRIVILEGES ON *.* TO 'libreryuser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;