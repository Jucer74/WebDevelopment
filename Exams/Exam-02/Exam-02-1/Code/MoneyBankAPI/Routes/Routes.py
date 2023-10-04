from fastapi import APIRouter
from Schemas.user_schema import UserSchema
from Config.db import engine
from Models.Account import Accounts
from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import sessionmaker
from sqlalchemy import delete

user = APIRouter()
Session = sessionmaker(bind=engine)

@user.get("/")
def root():
    return {"message": "Hola"}
# Obtener un usuario por su ID


@user.get("/api/Account/all")
def get_all_accounts():
    with engine.connect() as conn:
        result = conn.execute(Accounts.select()).fetchall()
        accounts = [dict(row) for row in result]
        conn.commit()
        conn.close()

    return accounts



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
        

@user.delete("/api/Account/{account_id}")
def delete_account(account_id: int):
    try:
        # Crear una conexión a la base de datos
        with engine.connect() as conn:
            # Definir la condición para la eliminación (en este caso, por ID)
            condition = Accounts.c.id == account_id

            # Ejecutar la consulta de eliminación
            result = conn.execute(delete(Accounts).where(condition))

            # Verificar si se eliminó una fila (cuenta) o no
            if result.rowcount == 0:
                raise HTTPException(status_code=404, detail=f"La cuenta con ID {account_id} no existe")
            conn.execute(delete(Accounts).where(condition))
            conn.commit()  # Confirmar la transacción
            
            return {"message": f"Cuenta con ID {account_id} eliminada exitosamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar la cuenta: {str(e)}")
