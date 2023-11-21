from fastapi import Depends, APIRouter
from infrastructure.dependencies import get_db
from sqlalchemy.orm import Session

router = APIRouter()
