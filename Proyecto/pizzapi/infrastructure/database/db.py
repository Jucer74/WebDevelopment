from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# .env para las variables de entorno
from dotenv import load_dotenv
from os import getenv
from databases import Database

load_dotenv()

SQLALCHEMY_DB_URL = getenv("DATABASE_URL")

metadata = MetaData()
db = Database(SQLALCHEMY_DB_URL)
engine = create_engine(SQLALCHEMY_DB_URL)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

Base.metadata.create_all(bind=engine) # creamos las tablas sin o existen


