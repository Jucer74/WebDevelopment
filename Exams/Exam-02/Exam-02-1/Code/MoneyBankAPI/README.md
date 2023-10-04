# FastAPI MoneyBank

1. Cree el entorno virtual con el comando `python -m venv venv`
2. Active el entorno virtual con el comando `source venv/bin/activate`
3. Instale las dependencias con el comando `pip install -r requirements.txt`

---

## Base de Datos: MySQL

Desde la consola, abrir mariadb (futuro reemplazo de MySQL) con el comando `mariadb -u root -p` (cambia mariadb por mysql si todavia funciona.)

Correr scripts de la carpeta Scripts en orden:

```bash
source 01_Create_Database.sql
source 02_Create_User.sql
source 03_TAB_Accounts.sql
source 04_INS_Accounts.sql

```

---

