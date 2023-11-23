/*DROP USER 'moneybankuser'@'localhost' ;*/
CREATE USER 'agentuser'@'localhost' IDENTIFIED BY 'Admin123';
GRANT ALL PRIVILEGES ON *.* TO 'agentuser'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;