from sqlalchemy.orm import Session

from infrastructure.database.db import SessionLocal

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

    
# db session generator
