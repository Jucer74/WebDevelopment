from typing import Optional
from sqlmodel import Field, SQLModel, create_engine, Session


class Hero(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    age: Optional[int] = None


sqlite_file_name = "./Database/Database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, echo=True)

SQLModel.metadata.create_all(engine)

def create_db_and_tables(): 
    SQLModel.metadata.create_all(engine)

def create_heroes():
    # Asignar DAtos a Instancias del Modelo en Memoria
    hero_1 = Hero(name="Deadpond", secret_name="Dive Wilson")
    hero_2 = Hero(name="Spider-Boy", secret_name="Pedro Parqueador")
    hero_3 = Hero(name="Rusty-Man", secret_name="Tommy Sharp", age=48)
    
    # Crear La Sesion
    session = Session(engine)

    # Adicionar los datos
    session.add(hero_1)
    session.add(hero_2)
    session.add(hero_3)

    # Aceptar los cambios
    session.commit()    

    # Cerrar la Sesion
    session.close()

def main():
    create_db_and_tables()
    create_heroes()


if __name__ == "__main__":
    main()