from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, DateTime,DECIMAL
from Config.db import engine, meta_data

Accounts = Table("Accounts", meta_data,
                 Column("id", Integer, primary_key=True, nullable=True),
                 Column("AccountType", String(1), nullable=False),
                 Column("CreationDate", DateTime, nullable=False),
                 Column("AccountNumber", String(10), nullable=False),
                 Column("OwnerName", String(100), nullable=False),
                 Column("BalanceAmount", DECIMAL(18,2), nullable=False),
                 Column("OverdraftAmount", DECIMAL(18,2), nullable=False))

meta_data.create_all(engine)