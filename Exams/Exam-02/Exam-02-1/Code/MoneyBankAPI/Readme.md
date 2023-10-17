## Install Libraries

```
pip install fastapi
pip install uvicorn
pip install sqlalchemy
pip install databases
pip install mysql-connector-python
pip install aiomysql
pip install python-dotenv
pip install pytest
pip install httpx
```

## Activate virtualenv 
deactivate  #Desactiva el entorno virtual si está activado
rm -r venv   #Elimina el entorno virtual existente
python -m venv venv   #Vuelve a crear el entorno virtual
.\venv\Scripts\Activate

## Run project  
uvicorn app:app --reload