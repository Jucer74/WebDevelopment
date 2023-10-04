from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, DateTime, decimal
from Config.db import engine, meta_data

Account = Table("Account", meta_data,
                 Column("id", Integer, primary_key=True),
                 Column("AccountType", String(1), nullable=False),
                 Column("CreationDate", DateTime, nullable=False),
                 Column("AccountNumber", String(10), nullable=False),
                 Column("OwnerName", String(100), nullable=False),
                 Column("BalanceAmount", decimal(18,2), nullable=False),
                 Column("OverdraftAmount", decimal(18,2), nullable=False))

meta_data.create_all(engine)