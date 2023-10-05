# IMPORTANTE, CAMBIAR EL PUERTO EN .ENV, NO TENIA EL PUERO 3306 DISPONIBLE, ASI QUE USE 3305

## Install Libraries

- pip install fastapi
- pip install uvicorn
- pip install sqlalchemy
- pip install databases
- pip install mysql-connector-python
- pip install aiomysql
- pip install python-dotenv
- pip install pytest
- pip install httpx
- pip install mysqlclient

## Create virtualenv

python3 -m venv venv

## Activate virtualenv

.\venv\Scripts\Activate

## Run project

uvicorn app:app --reload

## Install requirements

pip install -r requirements.txt

## Run tests

pytest Test/testApp.py
