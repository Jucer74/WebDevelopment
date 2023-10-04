from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from Models.accountsModel import AcccountsModel
from Schemas.accountsSchemas import AccountsSchemas
from Config.database import SessionLocal

router = APIRouter()


# Read all accounts
@router.get("/accounts", tags=["Accounts"])
async def get_all_accounts(db: Session = Depends(get_db)):
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
@router.post("/accounts",tags=["Accounts"])
async def create_account(account: AccountsSchemas):
    session=SessionLocal()
    try:
        new_account = AcccountsModel(
            Id=account.Id,
            AccountType=account.AccountType,
            CreationDate=account.CreationDate,
            AccountNumber=account.AccountNumber,
            OwnerName=account.OwnerName,
            BalanceAmount=account.BalanceAmount,
            OverdraftAmount=account.OverdraftAmount
        )

        Session(new_account)
        Session.commit()
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

        existing_account.AccountType=account.AccountType
        existing_account.CreationDate=account.CreationDate
        existing_account.AccountNumber=account.AccountNumber
        existing_account.OwnerName=account.OwnerName
        existing_account.BalanceAmount=account.BalanceAmount
        existing_account.OverDraftAmount=account.OverDraftAmount

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
        existing_account = db.query(AcccountsModel).filter(AcccountsModel.Id == id).first()
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

        # Perform deposit
        account.BalanceAmount += amount

        # Commit changes
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

# Withdraw from an account
@router.put("/accounts/{id}/withdraw",tags=["Accounts"])
async def withdraw_from_account(id: int, amount: float):
    session = SessionLocal()
    try:
        account = session.query(AcccountsModel).filter(AcccountsModel.Id == id).first()
        if account is None:
            raise HTTPException(status_code=404, detail="Account not found")

        # Ensure sufficient balance for withdrawal
        if account.BalanceAmount < amount:
            raise HTTPException(status_code=400, detail="Insufficient funds for withdrawal")

        # Perform withdrawal
        account.BalanceAmount -= amount

        # Commit changes
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
