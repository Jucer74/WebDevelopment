
CREATE TABLE Categorias (
    id          SERIAL PRIMARY KEY ,
    nombre      VARCHAR(20) NOT NULL,
    descripcion VARCHAR(255) 
);

CREATE TABLE Productos
(
    id          SERIAL PRIMARY KEY,
    categoria_id     INTEGER NOT NULL,
    referencia  VARCHAR(50) NOT NULL,
    nombre  VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    precio_unitario NUMERIC(19,2) NOT NULL,
    FOREIGN KEY (categoria_id)
        REFERENCES Categorias(id)
);

CREATE TABLE Usuarios
(
    id serial PRIMARY KEY,
    nombres  VARCHAR(50) NOT NULL,
    apellidos  VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
);

CREATE TABLE Comunidad
(
    id_comunidad serial PRIMARY KEY,
    id_usuario integer NOT NULL,
    fecha_de_publicacion date,
    titulo VARCHAR(20) NOT NULL,
    contenido VARCHAR(300) NOT NULL,
    comentarios VARCHAR(300) NOT NULL,
    FOREIGN KEY (id_usuario)
        REFERENCES Usuarios(id)
);

CREATE TABLE Home_Studio
(
    id serial PRIMARY KEY,
    nombre      VARCHAR(10) NOT NULL,
   
    Alto  bigint NOT NULL,
    Ancho bigint NOT NULL,
    Largo bigint NOT NULL,
    material_paredes VARCHAR(10) NOT NULL,
    fecha_creacion date,
    id_usuario integer NOT NULL,
    costo_estimado NUMERIC(19,2) NOT NULL,
    id_productos INTEGER NOT NULL,
    
    FOREIGN KEY (id_usuario)
        REFERENCES Usuarios(id)
);

CREATE TABLE lo_que_se_va_a_mostrar
(
    id serial PRIMARY KEY,
    nombre      VARCHAR(10) NOT NULL,
    descripcion VARCHAR(300) NOT NULL,
    fecha_creacion date,
    id_usuario integer NOT NULL,
    costo_estimado NUMERIC(19,2) NOT NULL,
    id_productos INTEGER NOT NULL,
    imagen_referencia VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_usuario)
        REFERENCES Usuarios(id)
);


CREATE TABLE Videos
(
    id serial PRIMARY KEY,
    titulo VARCHAR(20) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    url_character VARCHAR(20) NOT NULL,
    fecha_de_carga date
);
