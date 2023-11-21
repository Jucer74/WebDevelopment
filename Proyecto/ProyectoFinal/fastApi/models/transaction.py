from sqlalchemy import Table, Column, TIMESTAMP, ForeignKey, Integer, String, DECIMAL, Enum
from sqlalchemy.orm import relationship
from config.db import meta, engine

transactions = Table(
    "transactions",
    meta,
    Column("transaction_id", Integer, primary_key=True, autoincrement=True),
    Column("user_id", Integer, ForeignKey(
        "Users.id", ondelete="CASCADE"), nullable=False),
    Column("amount", DECIMAL(10, 2), nullable=False),
    Column("transaction_type", Enum('Deposit', 'Withdrawal'), nullable=False),
    Column("transaction_date", TIMESTAMP, server_default="CURRENT_TIMESTAMP"),
    Column("image_path", String(255)),
    extend_existing=True
)

users = Table("Users", meta, autoload=True)
relationship_users = relationship("Users", back_populates="transactions")

meta.create_all(engine)
