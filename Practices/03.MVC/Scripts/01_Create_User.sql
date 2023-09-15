/*DROP USER 'studentuser'@'localhost' ;*/
CREATE USER 'studentuser'@'localhost' IDENTIFIED BY 'StudentUs3*01';
GRANT ALL PRIVILEGES ON *.* TO 'studentuser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;