/*DROP USER 'zenvoyageuser'@'localhost' ;*/
CREATE USER 'zenvoyageuser'@'localhost' IDENTIFIED BY 'Z3nV0y4g3';
GRANT ALL PRIVILEGES ON *.* TO 'zenvoyageuser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;