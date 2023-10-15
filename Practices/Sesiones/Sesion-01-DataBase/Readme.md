# Creación de la base de datos
Usando Microsoft **SQL Server Management Studio (SSMS)**, creamos una nueva base de datos  así:

**1.** Haga click derecho sobre el nodo de databases y seleccione la opción **New Database...**

![Database](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-01-DataBase/Database-01.png)

**2.** Asigne el nombre **UsersDB** a la base de datos.

![Database](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-01-DataBase/Database-02.png)

**3.** Expanda la base de datos **UsersDB**, luego haga click derecho sobre el nodo **Tables** y escoja la opcion **New** y ahi la opción **Table...**.

![Database](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-01-DataBase/Database-03.png)

**4.** Llene los campos ssgún la siguiente especificación:

![Database](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-01-DataBase/Database-04.png)

	Id		:	int		Not Null
	Email		:	Varchar(255)	Not Null
	Name		:	Varchar(50)	Not Null
	Password	:	Varchar(50)	Not Null
	Username	:	Varchar(50)	Not Null
 
**6.** Seleccione el campo **Id** y en las propiedades escoja la propiedad **Identity Especification** y en el campo **(IsIdentity)** escoja la opción **True**.

![Database](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-01-DataBase/Database-05.png)

**7.** Seleccione el campo **Id** y haciendo click derecho escoja la opción **Set Primary Key**

![Database](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-01-DataBase/Database-06.png)

**8.** Guarde los cambios presionando las teclas **CTRL + S** o haga click en el disquete para guardar la base de datos y darle un nombre.

**9.** Asigne el nombre **Users** para la tabla.

![Database](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-01-DataBase/Database-07.png)

**10.** Por último presione la tecla **F5** para refrescar los datos y ver la tabla creada.


# Insertar Datos

**1.** Abra el archivo **Ins_Users.sql** presionando las teclas **CTRL + O** y ejecute el script.

**2.** Luego presione las teclas **CTRL + N** y ejecute el siguiente script para mostrar los usuarios.

```sql
SELECT * FROM [Users]
GO
```
    

# Crear Usuario Admin
Vamos a crear un usuario administrador para poder aceder a la base de datos desde nuestra aplicación.

**1.** Selecciona el nodo **Security/Logins** y haz click derecho sobre el y en el menú flotante y escoge la opción **New Login...**.

![Database](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-01-DataBase/Database-08.png)

**2.** En la Sección de **General** llena los campos así:

- **Login Name:** Admin
- Select **SQL Server Autentication**
	- **Password:** Admin123
	- **Confirm Password:** Admin123 
- **Uncheck** Enforce password policy
- **Default database:** UsersDB

![Database](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-01-DataBase/Database-09.png)

**3.** En la sección de **User Mapping** llena nos campos así:

- Users mapped to this login: 
	- Selecciona la base de datos **UsersDB** 
- Database role membership for: UserdDB: 
	- Selecciona:
		- db_owner
		- public

![Database](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-01-DataBase/Database-10.png)

**4.** Presiona el botón de **OK** para confirmar los cambios.

# Validar Autenticación Mixta
MS SQL Server por defecto permite tener doble autenticación, per debe ser activada, para ello valide los siguientes pasos:

1. Seleccionando el servidor de base de datos haga click derecho y en el menú flotante escoja **Propiedades**

![Database](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-01-DataBase/Database-11.png)

2. En la sección de Security cambie la opción de Server Autenticatión a SQL Server and Windows Authentication mode.

![Database](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-01-DataBase/Database-12.png)

Esta acción pide reinicio del servicio del SQL Server.

3. Reinicie el servicio de SQL Server, haciendo click derecho nuevamente sobre el nodo del servidor y seleccione la opción **Restart**

![Database](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-01-DataBase/Database-13.png)


4. Por último acepte el reinicio y verifique de nuevo el acceso con el usuario **Admin**.

![Database](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-01-DataBase/Database-14.png)


  
