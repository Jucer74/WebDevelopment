from os import getenv
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import declarative_base, sessionmaker
from databases import Database
from dotenv import load_dotenv

load_dotenv() # las variables de entorno será: DATABASE_URL

DATABASE_URL = getenv("DATABASE_URL")

db = Database(DATABASE_URL)
metadata = MetaData()

# SQLAlchemy Engine

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()