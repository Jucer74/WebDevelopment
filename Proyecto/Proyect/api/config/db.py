from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base

DATABASE_URL = "mysql+pymysql://root:geometrydash2.0@localhost:3306/AgenciaViajes"

engine = create_engine(DATABASE_URL)

meta = MetaData()

# Esta es la forma recomendada de crear la sesión
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base: DeclarativeMeta = declarative_base()