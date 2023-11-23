INSERT INTO tiposDocumento (descripcion) VALUES ('Cédula');
INSERT INTO tiposDocumento (descripcion) VALUES ('NIT');

INSERT INTO estadosPedido (descripcion) VALUES ('Pendiente');
INSERT INTO estadosPedido (descripcion) VALUES ('Aceptado');
INSERT INTO estadosPedido (descripcion) VALUES ('Cancelado');


INSERT INTO Clientes (tido_id, nombres, apellidos, documento, estado)
VALUES(1, 'Daniel', 'Pareja Londoño', '101234', 'A');