# FastAPI
En esta sesion Veremos como crear una API utlizando el framework de FastAPI, ademas de como ejecutarla para poder realizar las operaciones basicas de REST y asi interactuar con la base de datos.

# Requisitos
Al ser FastAPI un framework basado en Python, debemos instalar este lenguaje y sus utilitarios.

## Python
Realice la Instalacion personalizada, de [Python.org](https://www.python.org/downloads/) seleccionando todas las opciones.
Luego en una ventana de comenaod o de powershell ejecute el siguiente comando para validar el correcto funcionamiento:

```
python --version
```

Como resultado debe obtener la version actual de Python que se instalo.

Ahora instalemos el Framework y sus utilitarios:

## FastAPI
Para Instalar [FastAPI](https://fastapi.tiangolo.com/es/) puede utilizar el gestor de librerias de Python (pip) ejecutando, la siguiente instruccion en una ventana de comandos:

```
pip install fastapi
```

##  Uvicorn
Para desplegar la API que se genera, se utiliza el servicio de [Uvicorn](https://www.uvicorn.org/), que permite desplegar localmente la APi para que pueda ser consumida por cualquier cliente. para ello puede utilizar el gestor de librerias de Python (pip) ejecutando el siguiente comando:

```
pip install 'uvicorn[standard]'
```

Modifique la variable de Ambiente PATH y adicione la tura de los scripts y precompilñados de Python, en mi caso y siendo que mi usuario es jrobles seria:

```
C:\Users\jrobles\AppData\Roaming\Python\Python311\Scripts
```

# Test Inicial
PAra validar que esta funcionando correctamente creamos un archivo llamado **main.py** con el siguietnte contenido:

```python
from fastapi import FastAPI
from typing import Union

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

```

y en la terminal, situados en el mismo directorio donde esta el archivo ejecutamos el siguiente comando:

```
uvicorn main:app --reload
```

Se desplegara ua informacion corespondiente al Inicio del servicio , en eonde se mosstara una URL similar a la siguiente:

```
http://127.0.0.1:8000 
```

Copie dicha URL en un navegador y confirme que se depliega el mensaje esperado. en este caso seria :

```
{"Hello":"World"}
```

De igual forma puede obtener la documentacion interactiva que es desplegada usando la libreria de Swagger, usando la siguietne URL:

```
http://127.0.0.1:8000/docs
```

En este punto puede ver el contenido completo de todos los endpoints expuestos por la API y puede interactuar con ellos directamente.

# Adicionando nuevos Endpoints

Ahora adicionaremos nuevos endpoints 

## Get con parametro
Adicione la siguiente funcion para habilitar un endpoint con parametro y posibilidad de enviar parametros por query string en la misma linea

```python
@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
```

Con este metodo se podra hacer llamado utlizando el item_id e la misma URL asi:

```
http://127.0.0.1:8000/items/5
```

Lo que conseguira una respuesta como la siguiente:

```
{"item_id":5,"q":null}
```

De igual forma podra realizar el llamado utilizando un valor par el query string asi:

```
http://127.0.0.1:8000/items/5?q=SomeValue
```

Obteniendo el siguiente resultado:

```
{"item_id":5,"q":"SomeValue"}
```

# Ambientes Virtuales
Para facilitar el proceso de desarrollo Python ofrece la posibilidad de crear ambientes virtuales de trabajo para que puedan ser utilizadas ciertas librerias, con versiones especificas, sin modificar o alterar el ambiente general de todo el ecosistema.

En este caso, crearemos un ambiednte virtual para poder trabajar nuestros cambios sin afectar el entorno general o la version de otras librerias, para ello ejecutaremos el siguiente comando:

```
python -m venv env
```
Esta instruccion creara una carpeta dentro de su directorio con el nombre del ambiente virtual creado, en este caso es **env**

Ahora para activar su ambiente debe ejecutar el Script **activate**, situado dentro de la carpeta de scripts.
ESte script puede varias sugun su sistema operativo, en este caso ejecutaremos la version de windows mediante powershell, para ello ejecutaremos el siguiente comando:

```
.\env\Scripts\Activate.ps1
```

Al ejecutar este comando vera como aparece al inicio de su linea de omcnados el ambiente activo, en este caso **(env)**, de todas formas para verficiar que el ambiente esta activo puede ejecutar el siguiente comando:

```
Get-Command python
```

Con esta instruccion obtendra una respuesta como la siguiente:

```
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Application     python.exe                                         3.11.51... C:\Tmp\env\S... 
```


# Database
Ahora estando dentro del ambiente virtual, activemos la conexion a la Base de datos, para ello instalaremos la libreria de [SQLModel](https://sqlmodel.tiangolo.com/) de la siguiente forma:

```
pip install sqlmodel
```

Esta libreria se base en el uso de otras dos librerias base como son :
- [SqlAlchemy](https://www.sqlalchemy.org/)
- [Pydantic](https://docs.pydantic.dev/latest/)

De tal forma que estas librerias tambien pueden ser utilizadas internamente en caso de necesitar comando adicinales.

Ahora crearemos la base de datos llamada **Database.db** en el directorio **Database**, esta es una base de datos de tipo SQLite.

## Create Database
Para mostrar la interaccion con la base  de datos crearemos un nuevo archivo llamado **database.py** con el siguiente contenido:

```python
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

def create_db_and_tables(): 
    SQLModel.metadata.create_all(engine)

if __name__ == "__main__":
    create_db_and_tables()
```

El uso de la instruccion:

```python
if __name__ == "__main__":
    create_db_and_tables()
```
Activa que solamente si el llamado se realiza desde main este codigo se ejecutara, de lo contrario no se crea la base de datos.

## Session
Al momento de interactuar con los datos y modificarlos o alterar el estado de las tablas, se debe realizar meiante la creacion de una **sesion**, ya que si se realizan los cambios sin esta interaccion, puede causar efectos no deseados.

La forma sencilla de crear una sesion es la siguiente:

```python
# Crear la Sesion
session = Session(engine)

# Inserte aca la Interaccion de Insert, Update o Delete

# Aceptar los cambios
session.commit()

# Cerrar la Sesion
session.close()
```

## Insert Data
Para Insertar datos usando codigo puede realizarlo adicionando la funcion siguiente al codigo de **database.py** asi:

```python
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
```

Por ultimo Adicione la funcion main y realice el cambio en la validacion de su llamado en la condicion del if asi:

```python
def main():
    create_db_and_tables()
    create_heroes()


if __name__ == "__main__":
    main()
```

## Ejecuar el Script
Ahora podemos ejecutar el Script para Crear la bse de datos y asu vez adiconar algunos registros de la siguiente manera:

```
python .\database.py
```

Una forma de Simplificar el manejo de la session y que eta se abra y se cierre automaticamente es cambiando la adicion de los datos de la siguiente forma:

```python
with Session(engine) as session: 
    session.add(hero_1)  
    session.add(hero_2)
    session.add(hero_3)
```

De esta forma se abre y se cierra la Sesion automaticamente al momento de ejecutar el commit de los datos.

Para conocer mas acerca de como realizar las operaciones de Insert, Update y Delete puede consultar el tutorial de la documentacion de [SQLModel](https://sqlmodel.tiangolo.com/tutorial/).

