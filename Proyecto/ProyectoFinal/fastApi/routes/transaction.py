from fastapi import APIRouter, HTTPException, Depends
from config.db import conn
from models.transaction import transactions
from schemas.transaction import Transaction, CreateTransaction, UpdateTransaction
from datetime import datetime

transaction = APIRouter()


@transaction.post("/transactions", response_model=Transaction, tags=["transaction"])
def create_transaction(transaction: CreateTransaction):

    last_transaction = conn.execute(
        transactions.select().order_by(transactions.c.transaction_id.desc()).limit(1)
    ).fetchone()

    next_transaction_id = 1 if last_transaction is None else last_transaction[
        "transaction_id"] + 1

    transaction_date = datetime.utcnow()

    transaction_data = transaction.dict()
    transaction_data['transaction_date'] = transaction_date

    query = transactions.insert().values(
        transaction_id=next_transaction_id, **transaction_data)
    conn.execute(query)

    return {"transaction_id": next_transaction_id, **transaction_data}


@transaction.get("/transactions/{transaction_id}", response_model=Transaction, tags=["transaction"])
def read_transaction(transaction_id: int):
    query = transactions.select().where(
        transactions.c.transaction_id == transaction_id)
    transaction = conn.execute(query).first()
    if transaction:
        return dict(transaction)
    raise HTTPException(status_code=404, detail="Transaction not found")


@transaction.get("/transactions", response_model=list[Transaction], tags=["transaction"])
def read_transactions(skip: int = 0, limit: int = 10):
    query = transactions.select().offset(skip).limit(limit)
    result = conn.execute(query)
    return result.fetchall()


@transaction.put("/transactions/{transaction_id}", response_model=Transaction, tags=["transaction"])
def update_transaction(transaction_id: int, updated_transaction: UpdateTransaction):

    update_data = {key: value for key, value in updated_transaction.dict(
        exclude_unset=True).items() if key != 'transaction_date'}

    if updated_transaction.transaction_date:
        update_data['transaction_date'] = updated_transaction.transaction_date

    query = transactions.update().where(transactions.c.transaction_id ==
                                        transaction_id).values(**update_data)
    conn.execute(query)
    return {**update_data, "transaction_id": transaction_id}


@transaction.delete("/transactions/{transaction_id}", response_model=dict, tags=["transaction"])
def delete_transaction(transaction_id: int):

    query = transactions.delete().where(
        transactions.c.transaction_id == transaction_id)
    conn.execute(query)

    conn.execute(
        f"UPDATE transactions SET transaction_id = transaction_id - 1 WHERE transaction_id > {transaction_id}"
    )

    return {"message": "Transaction deleted successfully"}
