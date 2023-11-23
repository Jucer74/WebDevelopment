from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import declarative_base
Base = declarative_base()

class Property(Base):
    __tablename__ = "inmuebles"

    id_inmueble = Column(Integer, primary_key=True, index=True, autoincrement=True)
    precio = Column(Integer)
    num_habitaciones = Column(Integer)
    barrio = Column(String(50))
    metros_cuadrados = Column(Integer)
    num_banos = Column(Integer)
    titulo = Column(String(100))
    creado_por = Column(Integer)