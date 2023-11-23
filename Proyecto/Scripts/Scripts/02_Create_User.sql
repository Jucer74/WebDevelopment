/*DROP USER 'Admin'@'localhost' ;*/
CREATE USER 'Admin'@'localhost' IDENTIFIED BY 'Admin123';
GRANT ALL PRIVILEGES ON CitasMedicasBD.* TO 'Admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;