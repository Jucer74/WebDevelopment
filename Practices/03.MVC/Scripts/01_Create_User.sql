/*DROP USER 'schooluser'@'localhost' ;*/
CREATE USER 'schooluser'@'localhost' IDENTIFIED BY 'Sch00lUs3*01';
GRANT ALL PRIVILEGES ON *.* TO 'schooluser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;