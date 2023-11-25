/*DROP USER 'agentedeportivouser'@'localhost' ;*/
CREATE USER 'agentedeportivouser'@'localhost' IDENTIFIED BY 'agentedeportivouser';
GRANT ALL PRIVILEGES ON *.* TO 'agentedeportivouser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;