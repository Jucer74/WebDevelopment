# Pizzaplace - API

Como correr localmente:

```sql

CREATE USER 'pizza_admin'@'localhost' IDENTIFIED BY 'p4ssw0rd*01';
GRANT ALL PRIVILEGES ON pizzadb.* TO 'pizza_admin'@'localhost';
FLUSH PRIVILEGES;

```

`.env` file debe contener algo asi:

> DATABASE_URL=mysql+mariadbconnector://pizza_admin:p4ssw0rd*01@localhost:3306/pizzadb

---

```shell

    mysql -u pizza_admin -p < Scripts/setup_user_db.sql

```
