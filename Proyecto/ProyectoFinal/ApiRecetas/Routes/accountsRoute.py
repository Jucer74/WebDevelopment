from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from Models.accountsModel import AccountsModel
from Schemas.accountsSchemas import AccountsSchema, DepositInput, WithdrawInput
from Config.database import SessionLocal

router = APIRouter()

MAX_OVERDRAFT =float(1000000.00)
 #Get all accounts
@router.get("/accounts", tags=["Accounts"])
async def get_all_accounts():
    try:
        accounts = SessionLocal().query(AccountsModel).all()
        return accounts
    
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

 # Get account by id
@router.get("/accounts/{id}", tags=["Accounts"])
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

 #Create account
@router.post("/accounts", tags=["Accounts"])
async def create_account(account: AccountsSchema):
    session = SessionLocal()
    
    try:
        new_account = AccountsModel(
            AccountType=account.AccountType,
            CreationDate=account.CreationDate,
            AccountNumber=account.AccountNumber,
            OwnerName=account.OwnerName,
            BalanceAmount=account.BalanceAmount,
            OverdraftAmount=account.OverdraftAmount
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

 #Update account
@router.put("/accounts/{id}", tags=["Accounts"])
async def update_account(id: int, account: AccountsSchema):
    session = SessionLocal()

    try:
        existing_account = session.query(AccountsModel).filter(AccountsModel.Id == id).first()

        if existing_account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        existing_account.OwnerName = account.OwnerName

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

# Delete account
@router.delete("/accounts/{id}", tags=["Accounts"])
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

# Deposit to account
@router.put("/accounts/{id}/deposit", tags=["Accounts"])
async def deposit_to_account(id: int, deposit_input: DepositInput):
    session = SessionLocal()
    try:
        account = session.query(AccountsModel).filter(AccountsModel.Id == id).first()
        if account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        amount_float = deposit_input.amount  # Convertir el valor a Decimal
        account.BalanceAmount += amount_float

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

#Withdraw from account
@router.put("/accounts/{id}/withdraw", tags=["Accounts"])
async def withdraw_from_account(id: int, withdrawal_input: WithdrawInput):  # Cambia el parámetro a WithdrawInput
    session = SessionLocal()
    try:
        account = session.query(AccountsModel).filter(AccountsModel.Id == id).first()
        if account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        withdrawal_amount = withdrawal_input.amount  # Utiliza withdrawal_input.amount

        if account.BalanceAmount < withdrawal_amount:
            raise HTTPException(status_code=400, detail="Insufficient funds for withdrawal")

        # Withdrawal logic
        account.BalanceAmount -= withdrawal_amount

        # Overdraft logic for account type "C"
        if account.AccountType == "C":
            if account.BalanceAmount < 0:
                overdraft_difference = abs(account.BalanceAmount)
                if overdraft_difference <= MAX_OVERDRAFT:
                    account.OverdraftAmount = overdraft_difference
                else:
                    raise HTTPException(status_code=400, detail="Exceeds MAX_OVERDRAFT")

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