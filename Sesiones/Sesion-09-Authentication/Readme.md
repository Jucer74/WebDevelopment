# Autenticacion con Json Web Token (JWT)
para facilitar el proceso de autenticacion utilizaremos la libreria de json-server que permite crear un servidor virtual que soporte todos los metodos de tipo REST.

## Pasos
Utilizando una ventana de consola o terminal ejecutaremos los siguietnes pasos:

1. Crearemos el Directorio **Server** e ingresaremos a el

```
mkdir Server
cd Server
```

2. Ininializaremos un proyecto de tipo node ejecutanto el comando init

```
npm init
```

Ingresando los siguientes datos:

- package name: webapi-server
- version: 1.0.0
- description: Simulacion de Web Api
- entry point: server.js
- test command: [NO INGRESA NADA]
- git repository: [NO INGRESA NADA]
- author:  [Su Nombre]
- license: MIT

Esto generara el archivo **package.json** con el siguiente contenido

```json
{
  "name": "webapi-server",
  "version": "1.0.0",
  "description": "Simulacion de Web Api",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Julio Robles",
  "license": "MIT"
}
```
3. Podemos generar un achivo de tipo json como nuestra base de datos principal. En este caso utilizaremos el archivo **EmployeesDB.json** y lo copiaremos dentro del directorio **Server**.

4. Instalamos nuestro servicios para simular el servidor **json-server**.

```
npm install json-server --save
```

5. Ejecute el comando **Fix** par completar las dependencias de los modulos utilizados y referenciados por el archivo **package.json** asi:

```
npm audit fix --force
```

6. Probemos que el servicio basico funciona, ejecutando el comando siguiente:

```
json-server --watch EmployeesDB.json
```

al ejecutar este comando debe obtener uns respuesta similar a esta

```
  \{^_^}/ hi!

  Loading EmployeesDB.json
  Done

  Resources
  http://localhost:3000/Employees

  Home
  http://localhost:3000

  Type s + enter at any time to create a snapshot of the database
  Watching...

```

7. Utilice Postman o cualquier otra herramienta para realizar peticiones a la API, en este punto puede ejecutar el siguiente comando **en otra ventna nueva de consola o terminal**:

```
curl http://localhost:3000/Employees
```
para este llamado debe obetener una erspuesta similar a la siguiente:

```
StatusCode        : 200
StatusDescription : OK
Content           : [
                      {
                        "id": 1,
                        "firstName": "Solomon",
                        "lastName": "Garland",
                        "hireDate": "03-10-2002",
                        "department": "Audit"
                      },
                      {
                        "id": 2,
                        "firstName": "Angy",
                        "lastName": "Couch"...
RawContent        : HTTP/1.1 200 OK
                    Vary: Origin, Accept-Encoding
                    Access-Control-Allow-Credentials: true
                    Pragma: no-cache
                    X-Content-Type-Options: nosniff
                    Connection: keep-alive
                    Keep-Alive: timeout=5
                    Content-Length...
Forms             : {}
Headers           : {[Vary, Origin, Accept-Encoding], [Access-Control-Allow-Credentials, true], [Pragma, no-cache],
                    [X-Content-Type-Options, nosniff]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 13316

```

## Funcionalides adicionales

### Paginacion de Datos
Puede consultar datos paginados agregando el parámetro de página **_page**. Por ejemplo:

```
curl -X GET "http://localhost:3000/Employees?_page=1"
```
Esto enviará una solicitud GET para leer la primera página.

### Filtrar Datos
También puede agregar filtros para obtener datos filtrados simplemente agregando los filtros. Por ejemplo:

```
curl -X GET "http://localhost:3000/Employes?firstName=Julio&lastName=Robles"
```
Si utiliza el caracter ampersand (&) puede adicionar y combinar multiples filtros.


### Ordenar Datos
Usted puede obtner los datos ordenados usando el comando **_sort** y **_order**. Por ejemplo:

```
curl -X GET "http://localhost:3000/Employees?_sort=lastName&order=DESC"
```

8. Detenga el servicio en la ventan del servidor presionando las taclas **CTRL+C**

# Adicionar la Autenticacion

1. Instalamos las librerias necesarias para generar e interpretar el **Bearer** Token.

```
npm install body-parser --save
npm install jsonwebtoken --save
```

2. Ejecute de nuevo el comando **Fix** par completar las dependencias de los modulos utilizados y referenciados por el archivo **package.json** asi:

```
npm audit fix --force
```

y verifique que las dependencias refieran a las ultimas versiones de cada librerias en el archivo ***package.json** asi:

```json
  "dependencies": {
    "body-parser": "^1.20.0",
    "json-server": "^0.17.0",
    "jsonwebtoken": "^8.5.1"
  }
```


3. Cree el archivo de usuarios **users.json** con los datos de usuarios registrads que pueden autenticarse, con el siguiente contenido:

```json
{
  "users": [
    {
      "id": 1,
      "email": "admin@email.com",
      "password": "P4ssw0rd*01"
    }
  ]
}
```

4. Creamos un nuevo archivo llamado **server.js** e iremos adicionadole las instrucciones necesarias para activar el servidor json-server con autentication.

5. Primero, comienza solicitando los módulos que necesitará usar, incluidos jsonwebtoken y json-server.

```js
const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
```

6. A continuación, utilice el método create() para devolver un servidor Express

```js
const server = jsonServer.create()
```

7. Llame al método router() para devolver un enrutador Express

```js
const router = jsonServer.router('./EmployeesDB.json')
```

8. Ahora necesita leer y analizar el archivo de usarios (users.json) Este archivo actúa como una tabla para usuarios registrados.

```js
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))
```

9. A continuación, defina algunas constantes: **SECRET_KEY** se usa para firmar las cargas útiles y **expiresIn** para configurar el tiempo de vencimiento de los tokens de acceso JWT.

```js
const SECRET_KEY = '123456789'
const expiresIn = '1h'
```

10. A continuación, establezca middlewares predeterminados (registrador, estática, cors y sin caché)

```
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());
```

11. Adicione las siguietnes funciones

```js
// Create a token from a payload 
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token 
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
function isAuthenticated({email, password}){
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}
```

12. Ahora necesita crear un punto final POST **/auth/login** que verifique si el usuario existe en la base de datos y luego crear y enviar un token JWT al usuario:

```js
// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const {email, password} = req.body;
  if (isAuthenticated({email, password}) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({email, password})
  console.log("Access Token:" + access_token);
  res.status(200).json({access_token})
})
```

13. A continuación, agregue un middleware Express que verifique que el encabezado de autorización tenga el esquema **Bearer** y luego verifique si el token es válido para todas las rutas, excepto la ruta anterior, ya que esta es la que usamos para iniciar la sesión de los usuarios.

```js
server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})
    return
  }
  try {
    let verifyTokenResult;
     verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

     if (verifyTokenResult instanceof Error) {
       const status = 401
       const message = 'Access token not provided'
       res.status(status).json({status, message})
       return
     }
     next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({status, message})
  }
})
```

14. Ahora necesita crear un punto final POST **/auth/register** para registrar un nuevo usuario en la base de datos y luego poderlo ingresar para obtener EL token JWT al usuario: 


```js
// Register New User
server.post('/auth/register', (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const {email, password} = req.body;

  if(isAuthenticated({email, password}) === true) {
    const status = 401;
    const message = 'Email and Password already exist';
    res.status(status).json({status, message});
    return
  }

  fs.readFile("./users.json", (err, data) => {  
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    };

    // Get current users data
    var data = JSON.parse(data.toString());

    // Get the id of last user
    var last_item_id = data.users[data.users.length-1].id;

    //Add new user
    data.users.push({id: last_item_id + 1, email: email, password: password}); //add some data
    var writeData = fs.writeFile("./users.json", JSON.stringify(data), (err, result) => {  // WRITE
        if (err) {
          const status = 401
          const message = err
          res.status(status).json({status, message})
          return
        }
    });
  });

  // Create token for new user
  const access_token = createToken({email, password})
  console.log("Access Token:" + access_token);
  res.status(200).json({access_token})
})

```

15. Finalmente, monte **json-server** y luego ejecute el servidor en el puerto **3000** usando:

```js
server.use(router)

server.listen(3000, () => {
  console.log('Run Auth API Server')
})

```

Eso es todo, ahora tienes una API protegida. 

16. Agreguemos dos scripts **npm** para ejecutar el servidor, agregando las siguientes lineas al archivo de **package.json**, antes de la seccion de **dependencies**.

```json
  "scripts": {
    "start": "json-server --watch ./db.json",
    "start-auth": "node server.js"
  },

```
Guarde todos sus cambios y ahora si ejecutemos el servidor 

17. Vuelva a la ventana de consola o terminal y ejecute el siguiente comando:

```
npm run start-auth
```

# Autenticarse
Utilizando **PostMan** oo cualquier otra herramientoq eu permita hacer el llamado tipo **REST** realice los siguientes pasos:

1. Ejecute el llamdo POST al endpoint auth/login, pasando los datos del usario asi:

```json
{
    "email": "admin@email.com",
    "password": "P4ssw0rd*01"
}
```

Si todo esta correctamente configurado, deberia obtener una respuesta como la siguiente:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiUDRzc3cwcmQqMDEiLCJpYXQiOjE2NjQ2NTE0NjIsImV4cCI6MTY2NDY1NTA2Mn0.JqyqLFS7bccMy3EJAsnvo09nII_Fmon210_0Gh5J9lY"
}
```

2. Utilizando el access token obtenido realice el llamado al metodo GET de todos los empleados, adicionando la autorizacion 