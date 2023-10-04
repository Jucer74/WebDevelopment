from Schemas.user_schema import UserSchema
from Config.db import engine, SessionLocal
from Models.Account import Accounts
from fastapi import APIRouter, HTTPException, Header
from sqlalchemy import delete, update
from authentication import verify_api_key
from fastapi.responses import JSONResponse

user = APIRouter()

@user.get("/")
def root():
    return {"message": "Hola"}
# Obtener un usuario por su ID

# Read all students
@user.get("/api/Account")
async def get_all_Accounts():
    try:
        students = SessionLocal().query(Accounts).all()
        return students
    
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})


# Read a student by Id
@user.get("/api/account/{id}")
async def get_student_by_id(id: int):
    try:
        student = SessionLocal().query(Accounts).filter(Accounts.c.id == id).first()
        if student is None:
            raise HTTPException(status_code=404, detail="Student not found")
        return student
    
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    

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

@user.put("/api/Account/{account_id}")
def update_account(account_id: int, updated_data: UserSchema):
    try:
        # Crear una conexión a la base de datos
        with engine.connect() as conn:
            # Definir la condición para la actualización (en este caso, por ID)
            condition = Accounts.c.id == account_id

            # Verificar si la cuenta existe antes de actualizarla
            existing_account = conn.execute(Accounts.select().where(condition)).fetchone()
            if existing_account is None:
                raise HTTPException(status_code=404, detail=f"La cuenta con ID {account_id} no existe")

            # Obtener los datos actualizados de la cuenta desde la solicitud
            updated_account_data = updated_data.dict(exclude_unset=True)

            # Ejecutar la consulta de actualización
            conn.execute(update(Accounts).where(condition).values(**updated_account_data))

            # Confirmar la transacción
            conn.commit()

            return {"message": f"Cuenta con ID {account_id} actualizada exitosamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar la cuenta: {str(e)}")