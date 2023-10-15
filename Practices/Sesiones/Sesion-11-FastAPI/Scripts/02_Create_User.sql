/*DROP USER 'studentsuser'@'localhost' ;*/
CREATE USER 'studentsuser'@'localhost' IDENTIFIED BY 'Stud3ntsUs3r*01';
GRANT ALL PRIVILEGES ON *.* TO 'studentsuser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;