from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

class MedicoModel(Base):
    
    __tablename__ = 'medicos'
    medico_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    imagen = Column(String)
    nombre = Column(String, index=True)
    especialidad = Column(String)
    clinica = Column(String)
   
