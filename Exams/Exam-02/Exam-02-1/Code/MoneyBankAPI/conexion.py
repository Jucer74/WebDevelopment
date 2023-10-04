import mysql.connector

try:
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="moneybankdb"
    )

    if connection.is_connected():
        print("Conexión a MySQL establecida con éxito")
    else:
        print("No se pudo conectar a MySQL")

except Exception as e:
    print("Error al conectar a MySQL:", e)

finally:
    if connection.is_connected():
        connection.close()