-- Comentario: DROP USER 'moneybankuser'@'localhost' ;

-- Crear usuario con contraseña
CREATE LOGIN moneybankuser WITH PASSWORD = 'M0n3yB4nkUs3r*01';

-- Asignar permisos
USE ; -- Reemplaza 'your_database_name' con el nombre de tu base de datos
CREATE USER moneybankuser FOR LOGIN moneybankuser;
ALTER ROLE db_datareader ADD MEMBER moneybankuser; -- Asignar permisos de lectura (ajusta según tus necesidades)
ALTER ROLE db_datawriter ADD MEMBER moneybankuser; -- Asignar permisos de escritura (ajusta según tus necesidades)

-- No es necesario "FLUSH PRIVILEGES" en SQL Server, así que puedes omitir esta línea.
