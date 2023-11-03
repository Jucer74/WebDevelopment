# Introducción a Boostrap
Bootstrap es un framework Front-End, compuesto de librerias Javascript, estilos CSS y componentes HTML que pemirten diseñar facilmente y dimanera dinámica, paginas web. En esta sesión veremos algunas des sus principales características y aprenderemos a utilizarlas.

## Requisitos
Necesitamos tener instalado 

- [Bootstrap](https://getbootstrap.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node JS](https://nodejs.org/en/download/)

### Extensiones VS Code
- Autoclose tag
- Beautify
- Bracket Pair Colorizer
- ES7 React/Redux/GraphQL/React-Native snippets
- GitLens
- GitHistory
- JavaScript (ES6) code snippets
- Live Server
- npm
- path intellisense
- TSLint
- Prettier
- vscode-icons

# Manos a la Obra
Vamos a crear un directorio al nivel del proyecto para que realicemos nuestras plantillas.

![Bootstrap](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-03-Bootstrap/Bootstrap-01.png)

Ahora iniciamos **Visual Studio Code** y abrimos ese folder como nuestro diectorio principal.

![Bootstrap](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-03-Bootstrap/Bootstrap-02.png)

Seleccionamos nuevo archivo y le asignamos el nombre **Details.html**

![Bootstrap](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-03-Bootstrap/Bootstrap-03.png)

En la session de Edicion escribimos el signo de exclamacion **!** y presionamos dos veces la tecla **Tab**. Esto nos genera automáticamente la plantilla inicial del codigo HTML así:

![Bootstrap](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-03-Bootstrap/Bootstrap-04.png)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

Ahora comencemos vamos a incluir Bootstrap.

En la página de Bootstrap obtenemos los links para cada uno de los componentes necesarios para incluir sus elementos.

### CSS
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
```
### JS / Bundle
```html
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
```
 
### Referenciar Bootstrap
En la pagina HTML incluimos estos enlaces de la siguiente forma:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
  <!-- Js / Bundle -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
  <title>Bootstrap-Document</title>
</head>
<body>
    
</body>
</html>
```

Ahora vamos a crear nuestro formulario para poder obtener los datos necesarios para guardar los datos de los usuarios.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
  <!-- JS / Bundle -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
  <title>Bootstrap-Document</title>
</head>
<body>
  <!-- Form -->    
  <div class="container">
    <h1>User Details</h1>
    <form id="frmUser">
      <div class="form-group">
        <label id="lblEmail" for="email">Email:</label>
        <input type="email" id="txtEmail" name="email" placeholder="username@domain.com" required class="form-control">

        <label id="lblName" for="name">Name:</label>
        <input type="text" id="txtName" name="name" placeholder="Julio Robles" required class="form-control">

        <label id="lblUsername" for="username">Username:</label>
        <input type="text" id="txtUsername" name="username" placeholder="username" required class="form-control">

        <label id="lblPassword" for="password">Password:</label>
        <input type="password" id="txtPassword" name="password" required class="form-control">

        <label id="lblConfirmPassword" for="confirmPassword">Confirm Password:</label>
        <input type="password" id="txtConfirmPassword" name="confirmPassword" required class="form-control">

      </div>
      <a href="#" class="btn btn-outline-success">Aceptar</a>
      <a href="#" class="btn btn-outline-secondary">Cancelar</a>
    </form>
  </div>
</body>
</html>
```

De esta forma tenemos nuestro formulario Inicial para capturar los datos que vamos a trabajar.

![Bootstrap](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-03-Bootstrap/Bootstrap-05.png)

## La lista de Usuarios
Ahora vamos a adicionar la lista de usuarios, para ello adicionamos un nuevo archivo llamado **Index.html**

![Bootstrap](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-03-Bootstrap/Bootstrap-06.png)

Editamos nuestro archivo y adicionamos una tabla para listar los usuarios de la siguientes forma:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
  <!-- JS / Bundle -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
  <!-- Font Awesome / Icons -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
  <title>Bootstrap-Document</title>
</head>
<body>
  <div class="container">
    <h1>User List </h1>
    <p> 
      <a href="#" class="btn btn-success"><i class="fas fa-plus"></i> New</a>
    </p>
  </div>
  <!-- Table -->
  <div class="container">
    <table class="table">
      <thead>
        <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Username</th>
            <th>Password</th>
            <!-- Actions -->
            <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td>1</td>
            <td>Julio.Robles@email.com</td>
            <td>Julio Robles</td>
            <td>jrobles</td>
            <td>Password</td>
            <td>
              <a href="#" class="btn btn-outline-primary">Edit</a>
              <a href="#" class="btn btn-outline-warning">Details</a>
              <a href="#" class="btn btn-outline-danger">Delete</a>
            </td>
        </tr>

        <tr>
          <td>2</td>
          <td>Pilar.Lopez@email.com</td>
          <td>Pilar Lopez</td>
          <td>plopez</td>
          <td>Password</td>
          <td>
            <a href="#" class="btn btn-outline-primary">Edit</a>
            <a href="#" class="btn btn-outline-warning">Details</a>
            <a href="#" class="btn btn-outline-danger">Delete</a>
          </td>
      </tr>
      
      <tr>
        <td>3</td>
        <td>Felipe.Daza@email.com</td>
        <td>Felipe Daza</td>
        <td>fdaza</td>
        <td>Password</td>
        <td>
          <a href="#" class="btn btn-outline-primary btn-sm">Edit</a>
          <a href="#" class="btn btn-outline-warning btn-sm">Details</a>
          <a href="#" class="btn btn-outline-danger btn-sm">Delete</a>
        </td>
    </tr>
    </tbody>
  </table>
  </div>
</body>
</html>
```

Acá podemos ver el resultado

![Bootstrap](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-03-Bootstrap/Bootstrap-07.png)


## Ejemplos
En este directorio vamos a encontrar unos ejemplos de cada uno de los elementos que pueden ser utilizados con Bootstrap para que aprendamos a utilizarlos.