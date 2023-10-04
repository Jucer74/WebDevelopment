from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from Models.accountModel import AccountModel  # Asegúrate de importar el modelo de cuenta correcto
from Schemas.accountSchema import AccountCreate, AccountUpdate, Account  # Asegúrate de importar los esquemas correctos
from Config.database import SessionLocal
from sqlalchemy.exc import IntegrityError  # Importa esta excepción para manejar la restricción única

router = APIRouter()

@router.get("/accounts", tags=["Accounts"])
async def get_all_accounts():
    try:
        accounts = SessionLocal().query(AccountModel).all()
        return accounts
    
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

# Read an account by Id
@router.get("/accounts/{id}", tags=["Accounts"])
async def get_account_by_id(id: int):
    try:
        account = SessionLocal().query(AccountModel).filter(AccountModel.Id == id).first()
        if account is None:
            raise HTTPException(status_code=404, detail="Account not found")
        return account
    
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

# Create a new account
@router.post("/accounts", tags=["Accounts"])
async def create_account(account: AccountCreate):
    # Crea una única instancia de sesión
    session = SessionLocal()
    
    try:
        new_account = AccountModel(
            AccountType=account.AccountType,
            CreationDate=account.CreationDate,
            AccountNumber=account.AccountNumber,
            OwnerName=account.OwnerName,
            BalanceAmount=account.BalanceAmount,
            OverdraftAmount=account.OverdraftAmount
        )
        
        # Agrega el nuevo estudiante y confirma la transacción
        session.add(new_account)
        session.commit()
        
        # Refresca la instancia de estudiante para obtener los valores generados por la base de datos
        session.refresh(new_account)
        
        return new_account
    
    except IntegrityError as integrity_err:
        # Manejar la violación de restricción única (AccountNumber)
        session.rollback()
        return JSONResponse(status_code=400, content={"error": "Account number already exists"})
    except HTTPException as http_exc:
        # En caso de error, realiza un rollback de la transacción
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()

# Update an account
@router.put("/accounts/{id}", tags=["Accounts"])
async def update_account(id: int, account: AccountUpdate):
    # Crea una única instancia de sesión
    session = SessionLocal()

    try:
        # Recupera la cuenta existente de la base de datos
        existing_account = session.query(AccountModel).filter(AccountModel.Id == id).first()

        # Si la cuenta no existe, devuelve un error 404
        if existing_account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        # Actualiza los campos de la cuenta con los valores proporcionados en la solicitud
        existing_account.AccountType = account.AccountType
        existing_account.CreationDate = account.CreationDate
        existing_account.AccountNumber = account.AccountNumber
        existing_account.OwnerName = account.OwnerName
        existing_account.BalanceAmount = account.BalanceAmount
        existing_account.OverdraftAmount = account.OverdraftAmount

        # Confirma la transacción
        session.commit()

        # Refresca la instancia de cuenta para obtener los valores actualizados de la base de datos
        session.refresh(existing_account)

        return existing_account
    
    except HTTPException as http_exc:
        # En caso de error, realiza un rollback de la transacción
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()

# Delete an account by ID
@router.delete("/accounts/{id}", tags=["Accounts"])
async def delete_account(id: int):
    # Crea una única instancia de sesión
    session = SessionLocal()

    try:
        # Recupera la cuenta existente de la base de datos
        existing_account = session.query(AccountModel).filter(AccountModel.Id == id).first()

        # Si la cuenta no existe, devuelve un error 404
        if existing_account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        # Elimina la cuenta de la base de datos
        session.delete(existing_account)

        # Confirma la transacción
        session.commit()

        return {"message": "Account deleted"}
    
    except HTTPException as http_exc:
        # Si se produce un error HTTP, realiza un rollback de la transacción
        session.rollback()
        raise http_exc
    except Exception as e:
         return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        # Siempre cierra la sesión
        session.close()