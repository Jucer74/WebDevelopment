from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker

engine = create_engine("mysql+pymysql://root:admin1234@localhost:3306/moneybankdb")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

meta_data = MetaData()