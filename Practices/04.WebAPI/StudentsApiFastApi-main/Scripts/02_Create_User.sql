/*DROP USER 'studentuser'@'localhost' ;*/
CREATE USER 'studentuser'@'localhost' IDENTIFIED BY 'Stu34msDen3r*0_ts';
GRANT ALL PRIVILEGES ON *.* TO 'studentuser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;