/*DROP USER 'RecipesAdmin' ;*/
CREATE USER 'RecipesAdmin' IDENTIFIED BY 'p4ssw0rd*01';
GRANT ALL PRIVILEGES ON *.* TO 'RecipesAdmin' WITH GRANT OPTION;
FLUSH PRIVILEGES;