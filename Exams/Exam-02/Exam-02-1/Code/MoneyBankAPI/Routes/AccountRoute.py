from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from Models.AccountModel import AccountModel
from Schemas.AccountSchema import AccountSchema
from Config.database import SessionLocal

router = APIRouter()

# Listar todas las cuentas
@router.get("/accounts", tags=["Accounts"])
async def list_accounts():
    try:
        db = SessionLocal()
        accounts = db.query(AccountModel).all()
        db.close()
        return accounts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Crear una nueva cuenta
@router.post("/accounts", tags=["Accounts"])
async def create_account(account: AccountSchema):
    try:
        db = SessionLocal()
        new_account = AccountModel(
            AccountType=account.AccountType,
            CreationDate=account.CreationDate,
            AccountNumber=account.AccountNumber,
            OwnerName=account.OwnerName,
            BalanceAmount=account.BalanceAmount,
            OverdraftAmount=account.OverdraftAmount
        )
        db.add(new_account)
        db.commit()
        db.refresh(new_account)
        db.close()
        return new_account
    except HTTPException as http_exc:
        db.rollback()
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Editar una cuenta por su Id
@router.put("/accounts/{id}", tags=["Accounts"])
async def edit_account(id: int, account: AccountSchema):
    try:
        db = SessionLocal()
        existing_account = db.query(AccountModel).filter(AccountModel.Id == id).first()
        if not existing_account:
            raise HTTPException(status_code=404, detail="Account not found")
        existing_account.AccountType = account.AccountType
        existing_account.CreationDate = account.CreationDate
        existing_account.AccountNumber = account.AccountNumber
        existing_account.OwnerName = account.OwnerName
        existing_account.BalanceAmount = account.BalanceAmount
        existing_account.OverdraftAmount = account.OverdraftAmount
        db.commit()
        db.refresh(existing_account)
        db.close()
        return existing_account
    except HTTPException as http_exc:
        db.rollback()
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Depositar en una cuenta por su Id
@router.post("/accounts/{id}/deposit", tags=["Accounts"])
async def deposit_to_account(id: int, amount: float):
    try:
        db = SessionLocal()
        existing_account = db.query(AccountModel).filter(AccountModel.Id == id).first()
        if not existing_account:
            raise HTTPException(status_code=404, detail="Account not found")
        existing_account.BalanceAmount += amount
        db.commit()
        db.refresh(existing_account)
        db.close()
        return existing_account
    except HTTPException as http_exc:
        db.rollback()
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Retirar de una cuenta por su Id
@router.post("/accounts/{id}/withdraw", tags=["Accounts"])
async def withdraw_from_account(id: int, amount: float):
    try:
        db = SessionLocal()
        existing_account = db.query(AccountModel).filter(AccountModel.Id == id).first()
        if not existing_account:
            raise HTTPException(status_code=404, detail="Account not found")
        if existing_account.BalanceAmount < amount:
            raise HTTPException(status_code=400, detail="Insufficient balance")
        existing_account.BalanceAmount -= amount
        db.commit()
        db.refresh(existing_account)
        db.close()
        return existing_account
    except HTTPException as http_exc:
        db.rollback()
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Obtener información de una cuenta por su Id
@router.get("/accounts/{id}", tags=["Accounts"])
async def get_account_info(id: int):
    try:
        db = SessionLocal()
        account = db.query(AccountModel).filter(AccountModel.Id == id).first()
        db.close()
        if not account:
            raise HTTPException(status_code=404, detail="Account not found")
        return account
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Eliminar una cuenta por su Id
@router.delete("/accounts/{id}", tags=["Accounts"])
async def delete_account(id: int):
    try:
        db = SessionLocal()
        existing_account = db.query(AccountModel).filter(AccountModel.Id == id).first()
        if not existing_account:
            raise HTTPException(status_code=404, detail="Account not found")
        db.delete(existing_account)
        db.commit()
        db.close()
        return {"message": "Account deleted"}
    except HTTPException as http_exc:
        db.rollback()
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))