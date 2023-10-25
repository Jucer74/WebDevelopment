/*DROP USER 'bmxuser'@'localhost' ;*/
CREATE USER 'bmxuser'@'localhost' IDENTIFIED BY 'BM3X34s4MsUs81*01';
GRANT ALL PRIVILEGES ON *.* TO 'bmxuser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;