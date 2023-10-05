from decimal import Decimal
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from Models.accountModel import AccountModel
from Schemas.accountSchema import AccountSchema
from Config.db import SessionLocal
from sqlalchemy import func

# enrutador para user <-> fastapi <-> db
router = APIRouter()

# global variable
MAX_OVERDRAFT = 1000000



# GET /Accounts
@router.get("/Accounts", tags=["Accounts"])
async def get_all_accounts():
    try:
        accounts = SessionLocal().query(AccountModel).all()
    except Exception as exception:
        return JSONResponse(status_code=500, content={"Error": "Internal Server Error", "message": str(exception)})
    finally: 
        return accounts


# GET /Accounts/{id}
@router.get("/Accounts/{id}", response_model=AccountSchema, tags=["Accounts"])
async def get_account_by_id (id: int):
    try:
        session = SessionLocal()
        account = session.query(AccountModel).filter(AccountModel.Id == id).first()
        if account is None or id > session.query(func.max(AccountModel.Id)).scalar(): # check if id esta out of bounds
            # pero nuevamente, no funciona. 
            # Ignora el if y lanza el error de abajo
            raise HTTPException(status_code=404, detail="Account not found")
        return account
    except HTTPException as httpException:
        return httpException
    except Exception as exception:
        return JSONResponse(status_code=500, content={"Error": f"Internal Server Error => {str(exception)}"})
    finally:
        #return account
        session.close()
    

# POST /Accounts
@router.post("/Accounts", tags=["Accounts"])
async def create_account (account: AccountSchema):
    session = SessionLocal()
    try:
        new_account = AccountModel(
            AccountType = account.AccountType,
            CreationDate = account.CreationDate,
            AccountNumber = int(account.AccountNumber),
            OwnerName = account.OwnerName,
            BalanceAmount = account.BalanceAmount,
            OverdraftAmount = 0 if account.AccountType == "A" else account.BalanceAmount + MAX_OVERDRAFT
            # si es cuenta de ahorros, no tiene sobregiro 
        )
        
        #mejor con pydantic y validator en el schema
        #if account.AccountType not in ["A", "C"]:
        #    raise HTTPException(status_code=400, detail="Account type must be A or C, else is not valid.")
        
        
        # api => db
        session.add(new_account)
        session.commit()
        session.refresh(new_account)
        return new_account

    except Exception as exception:
        return JSONResponse(status_code=500, content={"Error": "Internal Server Error", "message": str(exception)})
    finally:
        session.close()
    

# PUT /Accounts/{id}
@router.put("/Accounts/{id}", tags=["Accounts"])
async def update_account(id: int, account: AccountSchema):
    session = SessionLocal()
    try:
        updated_account = session.query(AccountModel).filter(AccountModel.Id == id).first()
        if updated_account is None:
            raise HTTPException(status_code=404, detail="Account not found!")
        
        updated_account.AccountType = account.AccountType
        updated_account.CreationDate = account.CreationDate
        updated_account.AccountNumber = account.AccountNumber
        updated_account.OwnerName = account.OwnerName
        updated_account.BalanceAmount = account.BalanceAmount
        updated_account.OverdraftAmount = account.OverdraftAmount
        
        # api => db
        session.commit()
        session.refresh(updated_account)
        return updated_account

    except HTTPException as httpException:
        session.rollback() # revertir cambios en la db
        raise httpException
    except Exception as exception:
        return JSONResponse(status_code=500, content={"Error": "Internal Server Error", "message": str(exception)})
    finally:
        session.close()


# DELETE /Accounts/{id}
@router.delete("/Accounts/{id}", tags=["Accounts"])
async def delete_account(id: int):
    session = SessionLocal()
    try:
        account_to_delete = session.query(AccountModel).filter(AccountModel.Id == id).first()
        if account_to_delete is None:
            raise HTTPException(status_code=404, detail="Account not found, cannot be removed.")
        
        # api => db
        session.delete(account_to_delete)
        session.commit()
        return {"message": "Account removed successfully!"}

    except HTTPException as httpException:
        session.rollback()
        raise httpException
    except Exception as exception:
        return JSONResponse(status_code=500, content={"Error": "Internal Server Error", "message": str(exception)})
    finally:
        session.close()

# PUT /Accounts/{id}/Deposit/{amount}
@router.put("/Accounts/{id}/Deposit/{amount}", tags=["Accounts"])
async def account_deposit(id: int, value_amount: float | int):
    session = SessionLocal()
    value_amount = Decimal(value_amount)
    try:
        account_to_deposit = session.query(AccountModel).filter(AccountModel.Id == id).first()
        if account_to_deposit is None:
            raise HTTPException(status_code=404, detail="Account not found, it cannot be deposited.")
        
        if account_to_deposit.AccountType == "A":
            account_to_deposit.BalanceAmount = account_to_deposit.BalanceAmount + value_amount
        elif account_to_deposit.AccountType == "C":
            account_to_deposit.BalanceAmount + value_amount
            account_to_deposit.OverdraftAmount = account_to_deposit.OverdraftAmount - value_amount
        
        # api => db
        session.commit()
        session.refresh(account_to_deposit)
        return {"message": "Deposit made successfully!",
                "account": f"ID {account_to_deposit.Id}  | {account_to_deposit.OwnerName}",
                "amount": value_amount}

    except HTTPException as httpException:
        session.rollback()
        raise httpException
    except Exception as exception:
        return JSONResponse(status_code=500, content={"Error": "Internal Server Error", "message": str(exception)})
    finally:
        session.close()



# PUT /Accounts/{id}/Withdraw/{amount}
@router.put("/Accounts/{id}/Withdraw/{amount}", tags=["Accounts"])
async def account_withdraw(id: int, value_amount: float | int):
    session = SessionLocal()
    value_amount = Decimal(value_amount)  
    try:
        account_to_withdraw = session.query(AccountModel).filter(AccountModel.Id == id).first()
        if account_to_withdraw is None:
            raise HTTPException(status_code=404, detail="Account not found, it cannot be withdrawn.")
        
        if account_to_withdraw.AccountType == "A":
            if value_amount > account_to_withdraw.BalanceAmount:
                raise HTTPException(status_code=400, detail="Fondos insuficientes, no se puede retirar más.")
        elif account_to_withdraw.AccountType == "C":    
            if account_to_withdraw.OverdraftAmount > 0 and account_to_withdraw.BalanceAmount < MAX_OVERDRAFT:
                account_to_withdraw.OverdraftAmount = MAX_OVERDRAFT - account_to_withdraw.BalanceAmount
            else:
                raise HTTPException(status_code=400, detail="Fontos Insuficientes, no se puede retirar más.") # el sobregiro maximo es de 1 millon (negative balance max)
        
        account_to_withdraw.BalanceAmount = account_to_withdraw.BalanceAmount - value_amount
        
        # api => db
        session.commit()
        session.refresh(account_to_withdraw)
        return {"message": "Withdraw made successfully!",
                "account": f"ID {account_to_withdraw.Id}  | {account_to_withdraw.OwnerName}",
                "amount": value_amount}

    except HTTPException as httpException:
        session.rollback()
        raise httpException
    except Exception as exception:
        return JSONResponse(status_code=500, content={"Error": "Internal Server Error", "message": str(exception)})
    finally:
        session.close()