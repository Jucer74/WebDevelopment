/*DROP USER 'moneybankuser'@'localhost' ;*/
CREATE USER 'moneybankuser'@'localhost' IDENTIFIED BY 'M0n3yB4nkUs3r*01';
GRANT ALL PRIVILEGES ON *.* TO 'moneybankuser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;