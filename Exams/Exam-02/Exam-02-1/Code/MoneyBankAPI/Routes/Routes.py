from fastapi import APIRouter
from Schemas.user_schema import UserSchema
from Config.db import engine
from Models.Account import Accounts
from fastapi import APIRouter, HTTPException

user = APIRouter()

@user.get("/")
def root():
    return {"message": "Hola"}
# Obtener un usuario por su ID
@user.get("/api/Account")
def get_all_accounts():
    with engine.connect() as conn:
        try:
            # Ejecutar la consulta SQL para obtener todos los usuarios
            result = conn.execute(Accounts.select()).fetchall()

            # Depura la consulta y los resultados
            print(result)

            # Convertir las filas en una lista de diccionarios, manejando columnas nulas
            users_list = [dict(row) if row is not None else {} for row in result]

            return users_list
        except Exception as e:
            # En caso de error, manejar la excepción y devolver un mensaje de error
            raise HTTPException(status_code=500, detail=f"Error al obtener usuarios: {str(e)}")

@user.post("/api/Account")
def create_Account(data_account: UserSchema):
    with engine.connect() as conn:
        try:
            # Obtener los datos de la cuenta desde la solicitud
            new_Account = data_account.dict()

            # Insertar los datos de la cuenta en la base de datos
            conn.execute(Accounts.insert().values(**new_Account))

            # Confirmar la transacción y cerrar la conexión a la base de datos
            conn.commit()
            conn.close()

            return {"message": "Cuenta creada exitosamente"}
        except Exception as e:
            # En caso de error, manejar la excepción y devolver un mensaje de error
            return HTTPException(status_code=500, detail=f"Error al crear la cuenta: {str(e)}")

