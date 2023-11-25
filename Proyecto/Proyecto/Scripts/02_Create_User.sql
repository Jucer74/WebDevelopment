/*DROP USER 'realestateuser'@'localhost' ;*/
CREATE USER 'realestateuser'@'localhost' IDENTIFIED BY 'R34l3st4t3S3rv1c3Us3r*01';
GRANT ALL PRIVILEGES ON *.* TO 'realestateuser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

