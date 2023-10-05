from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from decimal import Decimal
from Models.accountsModel import AccountsModel
from Schemas.accountsSchema import AccountsSchema
from Config.database import SessionLocal

# Crea un nuevo enrutador
router = APIRouter()

# Constante para el valor máximo de sobregiro
MAX_OVERDRAFT = Decimal('1000000.00')

# Función para validar el balance y sobregiro
def validate_balance_and_overdraft(balance: Decimal, overdraft: Decimal, withdrawal: Decimal) -> bool:
    return balance + overdraft >= withdrawal

# Leer todas las cuentas
@router.get("/accounts", tags=["Accounts"])
async def get_all_accounts():
    try:
        session = SessionLocal()
        accounts = session.query(AccountsModel).all()
        session.close()
        return accounts
    
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

# Leer una cuenta por ID
@router.get("/accounts/{id}", tags=["Accounts"])
async def get_account_by_id(id: int):
    try:
        session = SessionLocal()
        account = session.query(AccountsModel).filter(AccountsModel.Id == id).first()
        session.close()
        if account is None:
            raise HTTPException(status_code=404, detail="Account not found")
        return account
    
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

# Eliminar una cuenta
@router.delete("/accounts/{id}", tags=["Accounts"])
async def delete_account(id: int):
    try:
        session = SessionLocal()
        
        existing_account = session.query(AccountsModel).filter(AccountsModel.Id == id).first()

        if existing_account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        session.delete(existing_account)
        session.commit()
        session.close()

        # Devuelve un mensaje de éxito con un código 200 OK y un mensaje personalizado
        return JSONResponse(status_code=200, content={"message": f"Account with ID {id} has been deleted successfully."})
    
    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        # En caso de un error inesperado, devuelve un mensaje de error con un código 500 Internal Server Error
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})



# Crear una nueva cuenta
@router.post("/accounts", tags=["Accounts"])
async def create_account(account: AccountsSchema):
    try:
        session = SessionLocal()
        
        # Validaciones
        if account.BalanceAmount < Decimal('0'):
            raise HTTPException(status_code=400, detail="Balance must be greater than or equal to 0")
        
        if account.AccountType == "C":
            account.BalanceAmount += MAX_OVERDRAFT
        
        new_account = AccountsModel(
            AccountType=account.AccountType,
            AccountNumber=account.AccountNumber,
            OwnerName=account.OwnerName,
            BalanceAmount=account.BalanceAmount,
            OverdraftAmount=Decimal('0') if account.AccountType == "A" else MAX_OVERDRAFT
        )
        
        session.add(new_account)
        session.commit()
        session.refresh(new_account)
        session.close()
        
        return new_account
    
    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

# Actualizar una cuenta
@router.put("/accounts/{id}", tags=["Accounts"])
async def update_account(id: int, account: AccountsSchema):
    try:
        session = SessionLocal()
        
        existing_account = session.query(AccountsModel).filter(AccountsModel.Id == id).first()

        if existing_account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        # Actualiza los campos de la cuenta con los valores proporcionados en la solicitud
        existing_account.AccountType = account.AccountType
        existing_account.AccountNumber = account.AccountNumber
        existing_account.OwnerName = account.OwnerName

        # Si el tipo de cuenta cambia a Corriente, actualiza el balance y el sobregiro
        if account.AccountType == "C":
            existing_account.BalanceAmount = account.BalanceAmount + MAX_OVERDRAFT
            existing_account.OverdraftAmount = MAX_OVERDRAFT

        # Confirma la transacción
        session.commit()
        session.refresh(existing_account)
        session.close()

        return existing_account
    
    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

# Depositar en una cuenta
@router.post("/accounts/{id}/deposit", tags=["Accounts"])
async def deposit_to_account(id: int, deposit_amount: Decimal):
    try:
        session = SessionLocal()

        existing_account = session.query(AccountsModel).filter(AccountsModel.Id == id).first()

        if existing_account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        if deposit_amount <= Decimal('0'):
            raise HTTPException(status_code=400, detail="Deposit amount must be greater than 0")

        existing_account.BalanceAmount += deposit_amount

        # Si la cuenta es Corriente y el balance actualizado es menor que el MAX_OVERDRAFT,
        # actualiza el sobregiro
        if existing_account.AccountType == "C" and existing_account.BalanceAmount < MAX_OVERDRAFT:
            existing_account.OverdraftAmount = MAX_OVERDRAFT - existing_account.BalanceAmount

        session.commit()
        session.refresh(existing_account)
        session.close()

        return existing_account
    
    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

# Retirar de una cuenta
@router.post("/accounts/{id}/withdraw", tags=["Accounts"])
async def withdraw_from_account(id: int, withdrawal_amount: Decimal):
    try:
        session = SessionLocal()

        existing_account = session.query(AccountsModel).filter(AccountsModel.Id == id).first()

        if existing_account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        if withdrawal_amount <= Decimal('0'):
            raise HTTPException(status_code=400, detail="Withdrawal amount must be greater than 0")

        # Si la cuenta es Corriente, el límite total disponible es el balance más el sobregiro
        if existing_account.AccountType == "C":
            total_limit = existing_account.BalanceAmount + existing_account.OverdraftAmount
        else:
            # Si es una cuenta de Ahorros, el límite total disponible es solo el balance
            total_limit = existing_account.BalanceAmount

        if withdrawal_amount <= total_limit:
            if withdrawal_amount <= existing_account.BalanceAmount:
                existing_account.BalanceAmount -= withdrawal_amount
            else:
                # Si no hay suficiente saldo, calcula el sobregiro utilizado y actualiza el saldo y el sobregiro
                overdraft_used = withdrawal_amount - existing_account.BalanceAmount
                existing_account.BalanceAmount = Decimal('0')

                # Siempre actualiza el sobregiro si es una cuenta Corriente
                if existing_account.AccountType == "C":
                    existing_account.OverdraftAmount -= overdraft_used
        else:
            raise HTTPException(status_code=400, detail="Insufficient Funds")

        session.commit()
        session.refresh(existing_account)
        session.close()

        return existing_account
    
    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})


