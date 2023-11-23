CREATE TABLE EstadosPedido (
    id          SERIAL PRIMARY KEY ,
    descripcion VARCHAR(10) NOT NULL
);

CREATE TABLE Categorias (
    id          SERIAL PRIMARY KEY ,
    nombre      VARCHAR(10) NOT NULL,
    descripcion VARCHAR(255)
);

CREATE TABLE TiposDocumento (
    id          SERIAL PRIMARY KEY ,
    descripcion VARCHAR(10) NOT NULL
);

CREATE TABLE Productos (
    id          SERIAL PRIMARY KEY,
    cate_id     INTEGER NOT NULL,
    referencia  VARCHAR(10) NOT NULL,
    nombre  VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255),
    precio_unitario NUMERIC(19,2) NOT NULL,
    unidades_disponibles NUMERIC(19,2) NOT NULL,
    FOREIGN KEY (cate_id)
        REFERENCES Categorias(id)
);

CREATE TABLE Clientes (
    id          SERIAL PRIMARY KEY,
    tido_id     INTEGER NOT NULL,
    nombres  VARCHAR(50) NOT NULL,
    apellidos  VARCHAR(50) NOT NULL,
    documento  VARCHAR(50) NOT NULL,
    estado  VARCHAR(1) NOT NULL,
    FOREIGN KEY (tido_id)
        REFERENCES TiposDocumento(id)
);

CREATE TABLE Pedidos (
    id          SERIAL PRIMARY KEY,
    clie_id     INTEGER NOT NULL,
    espe_id     INTEGER NOT NULL,
    fecha       TIMESTAMP NOT NULL,
    total       NUMERIC(19,2) NOT NULL,
    FOREIGN KEY (clie_id)
        REFERENCES Clientes(id),
    FOREIGN KEY (espe_id)
        REFERENCES EstadosPedido(id)
);

CREATE TABLE DetallesPedido (
    id          SERIAL PRIMARY KEY,
    pedi_id     INTEGER NOT NULL,
    prod_id     INTEGER NOT NULL,
    cantidad    NUMERIC(19,2) NOT NULL,
    valor       NUMERIC(19,2) NOT NULL,
    FOREIGN KEY (pedi_id)
        REFERENCES Pedidos(id),
    FOREIGN KEY (prod_id)
        REFERENCES Productos(id)
);