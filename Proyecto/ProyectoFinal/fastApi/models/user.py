from sqlalchemy import Table, Column, Integer, String, DECIMAL, Enum
from config.db import meta, engine
from sqlalchemy.orm import relationship

users = Table(
    "Users",
    meta,
    Column("id", Integer, primary_key=True),
    Column("name", String(50)),
    Column("email", String(255)),
    Column("password", String(50)),
    Column("username", String(50)),
    Column("address", String(255)),
    Column("city", String(100)),
    Column("balance", DECIMAL(10, 2)),
    Column("account_type", Enum('Checking', 'Savings')),
)

transactions = Table("transactions", meta, autoload=True)
relationship_transactions = relationship(
    "transactions", back_populates="users")

meta.create_all(engine)
