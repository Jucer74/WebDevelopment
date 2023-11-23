from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

from Config.database import SessionLocal, SECRET_KEY, ALGORITHM
from Models.users import Users
from Models.propertyData import Property
from Schemas.usersSchemas import UsersSchemas
from Schemas.propertyDataSchema import PropertySchema

router = APIRouter()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Custom OAuth2PasswordBearer subclass to hide tokenUrl in Swagger
class MyOAuth2PasswordBearer(OAuth2PasswordBearer):
    def __init__(self, tokenUrl=None, auto_error: bool = True):
        super().__init__(tokenUrl=tokenUrl, auto_error=auto_error)

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Function to create a JWT token
def create_jwt_token(data: dict):
    to_encode = data.copy()
    expiration = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expiration})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Function to verify the user's password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Endpoint to create a new user
@router.post("/create_user")
async def create_user(user_data: UsersSchemas, db: Session = Depends(get_db)):
    hashed_password = pwd_context.hash(user_data.password)
    new_user = Users(**user_data.dict(), password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Custom OAuth2PasswordBearer instance to use in your code
oauth2_scheme = MyOAuth2PasswordBearer(tokenUrl="token")

# Endpoint to obtain an access token by providing valid credentials
@router.post("/token", summary="Login to get an access token", description="Use this endpoint to obtain an access token by providing valid credentials.")
async def login_for_access_token(form_data: MyOAuth2PasswordBearer = Depends()):
    db = SessionLocal()
    user = db.query(Users).filter(Users.email == form_data.username).first()
    if user is None or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token_data = {"sub": form_data.username}

# Endpoint to get all properties
@router.get("/properties", tags=["Properties"])
async def get_all_properties(db: Session = Depends(get_db)):
    properties = db.query(Property).all()
    return properties

# Endpoint to get properties by user ID
@router.get("/properties_by_user/{user_id}", tags=["Properties"])
async def get_properties_by_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.id_usuario == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    properties = db.query(Property).filter(Property.id_usuario == user_id).all()
    return properties

# Endpoint to create a new property
@router.post("/create_property", tags=["Properties"])
async def create_property(property_data: PropertySchema, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.id_usuario == property_data.id_usuario).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    new_property = Property(**property_data.dict())
    db.add(new_property)
    db.commit()
    db.refresh(new_property)
    return new_property

# Endpoint to edit an existing property
@router.put("/edit_property/{property_id}", tags=["Properties"])
async def edit_property(property_id: int, property_data: PropertySchema, db: Session = Depends(get_db)):
    existing_property = db.query(Property).filter(
        Property.id_inmueble == property_id,
        Property.id_usuario == property_data.id_usuario
    ).first()

    if existing_property is None:
        raise HTTPException(status_code=404, detail="Property not found or you do not have permission to edit this property.")

    for key, value in property_data.dict().items():
        setattr(existing_property, key, value)

    db.commit()
    db.refresh(existing_property)

    return existing_property

# Endpoint to delete a property
@router.delete("/delete_property/{property_id}", tags=["Properties"])
async def delete_property(property_id: int, db: Session = Depends(get_db)):
    existing_property = db.query(Property).filter(
        Property.id_inmueble == property_id
    ).first()

    if existing_property is None:
        raise HTTPException(status_code=404, detail="Property not found")

    db.delete(existing_property)
    db.commit()

    return {"message": "Property deleted successfully"}
