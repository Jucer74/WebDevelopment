from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from Models.accountsModel import AccountsModel
from Schemas.accountsSchemas import AccountsSchema, DepositInput, WithdrawInput
from Config.database import SessionLocal

router = APIRouter()

@router.get("/Accounts", tags=["Accounts"])
async def get_all_accounts():
    try:
        accounts = SessionLocal().query(AccountsModel).all()
        return accounts
    
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

@router.get("/Accounts/{id}", tags=["Accounts"])
async def get_account_by_id(id: int):
    try:
        account = SessionLocal().query(AccountsModel).filter(AccountsModel.Id == id).first()
        if account is None:
            raise HTTPException(status_code=404, detail="Account not found")
        return account
    
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

@router.post("/Accounts", tags=["Accounts"])
async def create_account(account: AccountsSchema):
    session = SessionLocal()
    
    try:
        new_account = AccountsModel(
            Id = account.Id,
            AccountType = account.AccountType,
            CreationDate = account.CreationDate,
            AccountNumber = account.AccountNumber,
            OwnerName = account.OwnerName,
            BalanceAmount = account.BalanceAmount,
            OverdraftAmount = account.OverdraftAmount
        )
        
        session.add(new_account)
        session.commit()
        
        session.refresh(new_account)
        
        return new_account
    
    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()


@router.put("/Accounts/{id}", tags=["Accounts"])
async def update_account(id: int, account: AccountsSchema):
    session = SessionLocal()

    try:
        existing_account = session.query(AccountsModel).filter(AccountsModel.Id == id).first()

        if existing_account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        existing_account.AccountType = account.AccountType,
        existing_account.CreationDate = account.CreationDate,
        existing_account.AccountNumber = account.AccountNumber,
        existing_account.OwnerName = account.OwnerName,
        existing_account.BalanceAmount = account.BalanceAmount,
        existing_account.OverdraftAmount = account.OverdraftAmount

        session.commit()

        session.refresh(existing_account)

        return existing_account
    
    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()

@router.delete("/Accounts/{id}", tags=["Accounts"])
async def delete_account(id: int):
    session = SessionLocal()

    try:
        existing_account = session.query(AccountsModel).filter(AccountsModel.Id == id).first()

        if existing_account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        session.delete(existing_account)

        session.commit()

        return {"message": "Account deleted"}
    
    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
         return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()

@router.post("/Accounts/{id}/deposit", tags=["Accounts"])
async def deposit_to_account(id: int, deposit_data: DepositInput):
    session = SessionLocal()

    try:
        account = session.query(AccountsModel).filter(AccountsModel.Id == id).first()

        if account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        if deposit_data.amount <= 0:
            raise HTTPException(status_code=400, detail="Deposit amount must be greater than zero")

        account.BalanceAmount += deposit_data.amount
        session.commit()

        session.refresh(account)

        return account

    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()

# Ruta para el retiro (Withdraw)
@router.post("/Accounts/{id}/withdraw", tags=["Accounts"])
async def withdraw_from_account(id: int, withdraw_data: WithdrawInput):
    session = SessionLocal()

    try:
        account = session.query(AccountsModel).filter(AccountsModel.Id == id).first()

        if account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        if withdraw_data.amount <= 0:
            raise HTTPException(status_code=400, detail="Withdraw amount must be greater than zero")

        if withdraw_data.amount > account.BalanceAmount:
            raise HTTPException(status_code=400, detail="Insufficient balance for withdrawal")

        account.BalanceAmount -= withdraw_data.amount
        session.commit()

        session.refresh(account)

        return account

    except HTTPException as http_exc:
        session.rollback()
        raise http_exc
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})
    finally:
        session.close()