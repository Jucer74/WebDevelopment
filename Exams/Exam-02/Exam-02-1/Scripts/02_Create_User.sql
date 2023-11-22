/*DROP USER 'zenvoyagesuser'@'localhost' ;*/
CREATE USER 'zenvoyagesuser'@'localhost' IDENTIFIED BY 'Z3nV0y4g3';
GRANT ALL PRIVILEGES ON *.* TO 'zenvoyagesuser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;