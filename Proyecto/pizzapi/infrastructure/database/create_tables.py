from db import Base, engine

def create_tables():
    Base.metadata.create_all(bind=engine)


# create_tables()