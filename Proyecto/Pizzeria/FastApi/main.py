from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector

app = FastAPI()

# conexión a base de datos
def get_db():
    mydb = mysql.connector.connect(
        host="localhost",
        user="usuario_pizzeria",
        password="LaPizzeria",
        database="pizzeria"
    )
    return mydb

# Modelo de Producto
class Producto(BaseModel):
    id: int
    categoria_id: int
    imagen_url: str
    nombre: str
    precio: float 

# Modelo de Categoria
class Categoria(BaseModel):
    id: int
    imagen_url: str
    descripcion: str




###################     CATEGORIAS

# Leer todas las categorias
@app.get("/categorias/")
async def read_categorias():
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM categorias")
    categorias = []
    for categoria in cursor:
        categorias.append(Categoria(id=categoria[0], imagen_url=categoria[1], descripcion=categoria[2]))
    return categorias

# Crear categoria
@app.post("/categorias/")
async def create_categoria(categoria: Categoria):
    db = get_db()
    cursor = db.cursor()

    sql = "INSERT INTO categorias (imagen_url, descripcion) VALUES (%s, %s)"
    val = (categoria.imagen_url, categoria.descripcion)
    cursor.execute(sql, val)

    db.commit()
    return {"mensaje": "categoria creada"}

# Editar categoria
@app.put("/categorias/{id}")
async def update_categoria(id: int, categoria: Categoria):
    db = get_db()
    cursor = db.cursor()

    sql = "UPDATE categorias SET imagen_url = %s, descripcion = %s WHERE id = %s"
    val = (categoria.imagen_url, categoria.descripcion, id)
    cursor.execute(sql, val)

    db.commit()
    return {"mensaje": "categoria actualizada"}

# Eliminar categoria
@app.delete("/categorias/{id}")
async def delete_categoria(id: int):
    db = get_db()
    cursor = db.cursor()

    sql = "DELETE FROM categorias WHERE id = %s"
    val = (id, )
    cursor.execute(sql, val)

    db.commit()
    return {"mensaje": "categoria eliminada"}

#######################################     PRODUCTOS
# Leer todos los productos
@app.get("/productos/")
async def read_productos():
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM productos")
    productos = []
    for producto in cursor:
        productos.append(Producto(id=producto[0], categoria_id=producto[1], imagen_url=producto[2], nombre=producto[3], precio=producto[4]))
    return productos

# Crear producto
@app.post("/productos/")
async def create_producto(producto: Producto):
    db = get_db()
    cursor = db.cursor()

    sql = "INSERT INTO productos (categoria_id, imagen_url, nombre, precio) VALUES (%s, %s, %s, %s)"
    val = (producto.categoria_id, producto.imagen_url, producto.nombre, producto.precio)
    cursor.execute(sql, val)

    db.commit()
    return {"mensaje": "producto creado"}

# Editar producto
@app.put("/productos/{id}")
async def update_producto(id: int, producto: Producto):
    db = get_db()
    cursor = db.cursor()

    sql = "UPDATE productos SET categoria_id = %s, imagen_url = %s, nombre = %s, precio = %s WHERE id = %s"
    val = (producto.categoria_id, producto.imagen_url, producto.nombre, producto.precio, id)
    cursor.execute(sql, val)

    db.commit()
    return {"mensaje": "producto actualizado"}

# Eliminar producto
@app.delete("/productos/{id}")
async def delete_producto(id: int):
    db = get_db()
    cursor = db.cursor()

    sql = "DELETE FROM productos WHERE id = %s"
    val = (id, )
    cursor.execute(sql, val)

    db.commit()
    return {"mensaje": "producto eliminado"}


