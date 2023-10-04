from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from fastapi import Depends
from Models.accountsModel import AcccountsModel
from Schemas.accountsSchemas import AccountsSchemas
from Config.database import SessionLocal
from decimal import Decimal  # Añade esta importación
# accountsRoute.py



router = APIRouter()
MAX_OVERDRAFT = Decimal("1000000.00")

def validate_and_open_account(account: AccountsSchemas) -> AcccountsModel:
    if account.BalanceAmount < 0:
        raise HTTPException(status_code=400, detail="Balance must be greater than or equal to zero")

    if account.AccountType == "A":
        account.BalanceAmount = account.BalanceAmount
    elif account.AccountType == "C":
        account.BalanceAmount += MAX_OVERDRAFT
    else:
        raise HTTPException(status_code=400, detail="Invalid account type")

    if account.OverdraftAmount > MAX_OVERDRAFT:
        raise HTTPException(status_code=400, detail="Overdraft amount exceeds the maximum limit")

    return AcccountsModel(
        AccountType=account.AccountType,
        CreationDate=account.CreationDate,
        AccountNumber=account.AccountNumber,
        OwnerName=account.OwnerName,
        BalanceAmount=account.BalanceAmount,
        OverdraftAmount=account.OverdraftAmount
    )

# Read all accounts
@router.get("/accounts", tags=["Accounts"])
async def get_all_accounts():
    try:
        accounts = SessionLocal().query(AcccountsModel).all()
        return accounts
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

# Read an account by Id
@router.get("/accounts/{id}", tags=["Accounts"])
async def get_account_by_id(id: int):
    try:
        account = SessionLocal().query(AcccountsModel).filter(AcccountsModel.Id == id).first()
        if account is None:
            raise HTTPException(status_code=404, detail="Account not found")
        return account
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
       return JSONResponse(status_code=500, content={"error": "Internal Server Error", "detail": str(e)})

# Create a new account

@router.post("/accounts", tags=["Accounts"])
async def create_account(account: AccountsSchemas):
    session = SessionLocal()
    try:
        new_account = validate_and_open_account(account)
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

# Update an account
@router.put("/accounts/{id}", tags=["Accounts"])
async def update_account(id: int, account: AccountsSchemas):
    session = SessionLocal()
    try:
        existing_account = session.query(AcccountsModel).filter(AcccountsModel.Id == id).first()
        if existing_account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        # Actualizar los atributos del modelo con los valores del objeto account
        existing_account.AccountType = account.AccountType
        existing_account.CreationDate = account.CreationDate
        existing_account.AccountNumber = account.AccountNumber
        existing_account.OwnerName = account.OwnerName
        existing_account.BalanceAmount = account.BalanceAmount
        existing_account.OverdraftAmount = account.OverdraftAmount  # Corregir aquí

        # Commit changes
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

# Delete an account by ID
@router.delete("/accounts/{id}", tags=["Accounts"])
async def delete_account(id: int):
    session = SessionLocal()
    try:
        existing_account = session.query(AcccountsModel).filter(AcccountsModel.Id == id).first()
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

@router.put("/accounts/{id}/deposit", tags=["Accounts"])
async def deposit_to_account(id: int, amount: float):
    session = SessionLocal()
    try:
        account = session.query(AcccountsModel).filter(AcccountsModel.Id == id).first()
        if account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        amount_decimal = Decimal(amount)
        account.BalanceAmount += amount_decimal

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


@router.put("/accounts/{id}/withdraw", tags=["Accounts"])
async def withdraw_from_account(id: int, amount: float):
    session = SessionLocal()
    try:
        account = session.query(AcccountsModel).filter(AcccountsModel.Id == id).first()
        if account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        withdrawal_amount = Decimal(amount)  # Convertir el valor a Decimal

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