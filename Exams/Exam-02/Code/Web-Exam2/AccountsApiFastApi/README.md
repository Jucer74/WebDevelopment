# Autor: TheNowRock Juan David Jimenez
StudentsApiFastApi
# API REST with FastApi and Database Mysql
This project is a simple CRUD using FastApi and Database Mysql 
## Endpoints

```
Get all students
http://localhost:8000/students

Get student by id
http://localhost:8000/students/1

Create student
http://localhost:8000/students

Update student
http://localhost:8000/students/1

Delete student
http://localhost:8000/students/1

Docs
http://localhost:8000/docs
```

## Description

```
This project is a simple CRUD using FastApi and Database Mysql
```

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

## Create virtualenv

```
python3 -m venv venv
```

## Activate virtualenv

```
source venv/bin/activate
```
# Run test
```
pytest Test/testApp.py
```

## Run project

```
uvicorn app:app --reload
```

## Create requirements

```
pip freeze > requirements.txt
```

## Install requirements

```
pip install -r requirements.txt
```

## Comando para mirar donde esta la carpeta con los scripts de la base de datos

```
pwd
```

## Acceder al administrador de la base de datos

```
mysql -u root -p
```

## Mirar las bases de datos

```
show databases;
```

## Acceder a la base de datos

```
use studentsdb;
```

## Create database MYSQL

```
source /home/thenowrock/Desktop/ProyectosProgramacion/ProjectsPython/StudentsApiFastApi/Scripts/01_Create_Data_Base.sql
```

## Create user MYSQL

```
source /home/thenowrock/Desktop/ProyectosProgramacion/ProjectsPython/StudentsApiFastApi/Scripts/02_Create_User.sql
```

## Create table Students MYSQL

```
source /home/thenowrock/Desktop/ProyectosProgramacion/ProjectsPython/StudentsApiFastApi/Scripts/03_Tab_Students.sql
```

## Insert data Students MYSQL

```
source /home/thenowrock/Desktop/ProyectosProgramacion/ProjectsPython/StudentsApiFastApi/Scripts/04_Ins_Student.sql
```

## Delete datos Students MYSQL

```
-- Eliminar la tabla Students
DROP TABLE Students;


-- Eliminar la base de datos Students
DROP DATABASE studentsdb;
```
