# Modelo Vista Controlador
El patrón de arquitectura de **Modelo-View-Controller** (MVC) divide una aplicación interactiva en tres partes.

1. **El modelo:**  Contiene los datos y la funcionalidad esencial.
2. **Las vistas:** Despliegan la información al usuario.
3. **Los controladores:** Manejan el input y el flujo de la información. 

Las vistas y los controladores juntos controlan la interfaz con el usuario. 
El mecanismo de cambio-propagación asegura la consistencia de la interfaz con el modelo.

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-01.png)

Es importante tener en cuenta que la petición es recibida por el controlador, el cual realiza la demanda del modelo y obtiene los datos, los mezcla con la vista y la retorna al navegador.

En esta sesión vamos a trabajar con este concepto y utilizaremos las plantillas de .Net para facilitar la implementacion de esta arquitectura.

# Creamos nuestro Proyecto
Vamos a crear un nuevo proyecto de tipo MVC para enlazar el llamado a la API.

1. Abrimos Visual Studio y creamos un nuevo proyecto. En este caso seleccionaremos el tipo **Blank Solution**.

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-02.png)

3. Seleccionamos el directorio (Proyecto) y llamaremos el proyecto como **WebDev**.

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-03.png)

4. Adicionaremos un nuevo proyecto haciendo click derecho sobre la raiz de la solución.

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-04.png)

5. Seleccionaremos el tipo **ASP .Net Core Web Application**

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-05.png)

6. Le asignamos el nombre WebDev.Application

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-06.png)

7. Seleccionamos el template **Web Application (Model-View-Controller)**. 

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-07.png)

8. Adicionaremos un nuevo modelo que refleje los datos a utilizar. Para ello adicionaremos una clase llamada **User** a la carpeta Models, haciendo click derecho sobre dicho folder.

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-08.png)

Ahora establecemos el modelo con los datos correspondientes así:

```csharp
using System.ComponentModel.DataAnnotations;

namespace WebDev.Application.Models
{
  public class User
  {
    [Key]
    public int Id { get; set; }
    [Required(ErrorMessage = "El email es obligatorio")]
    public string Email { get; set; }
    [Required(ErrorMessage = "El nombre es obligatorio")] 
    public string Name { get; set; }
    [Required(ErrorMessage = "El nombre de usuario es obligatorio")]
    public string Username { get; set; }
    [Required(ErrorMessage = "El password es obligatorio")]
    public string Password { get; set; }
  }
}
```

9. Adicione un nuevo controlador haciendo click derecho sobre el folder de **Controllers**

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-09.png)

10. Seleccione la plantilla **MVC Controller with read/write actions**

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-10.png)

11. Asigne el nombre **UsersController.cs** a la nueva clase que se genera.

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-11.png)

12. Adicione el llamado al nuevo controlador modificando la clase **Startup**, adicionando un nuevo **EndPoint** con las siguientes lineas en la function **Configure**.

```csharp
// Users
endpoints.MapControllerRoute(
  name: "Users",
  pattern: "{controller=Users}/{action=Index}/{id?}");
```
De esta forma se establece que la accion inicial para el controlador de **Users** es **Index**.

Así nos queda la funcion **Configure**. 
```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
  if (env.IsDevelopment())
  {
    app.UseDeveloperExceptionPage();
  }
  else
  {
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
  }
  app.UseHttpsRedirection();
  app.UseStaticFiles();

  app.UseRouting();

  app.UseAuthorization();

  app.UseEndpoints(endpoints =>
  {
    endpoints.MapControllerRoute(
      name: "default",
      pattern: "{controller=Home}/{action=Index}/{id?}");
	// Users
    endpoints.MapControllerRoute(
      name: "Users",
      pattern: "{controller=Users}/{action=Index}/{id?}");
  });
}
```

13. Volvemos al controlador y hacemos click derecho sobre Action **Index** para que adicionemos la vista correspondiente, seleccionando la opcion **Add View...**

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-12.png)

14. Seleccionamos el tipo **Razor View**

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-13.png)

15. Complete los datos:
	- **View name:** Index
	- **Template:** List
	- **Model class:** User (WebDev.Application.Models)  

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-14.png)

Esta accion adiciona un nuevo folder llamado **Users** dentro del nodo de **Views** e internamente se crea la vista definida **Index.cshtml**.

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-15.png)

16. Volvemos al Controlador y vamos a simular la respuesta para validar nuestra ejecución, así:

a. Adiciones los las librerias para manejo de lista y para el uso del modelo

```csharp
using System.Collections.Generic;
using WebDev.Application.Models;
```

b. Adicione un atributo de clase para la lista de usuarios y Cree unconstructor para la clase controlador y adicione elementos para la clase para simular los datos de los usuarios. 

```csharp
private static List<User> _userList;
private static int numUsers;

public UsersController()
{
  // Mock User List
  if (_userList is null)
  {
    _userList = new List<User>()
    {
      new User{Id=1, Email="Julio.Robles@email.com", Name="Julio Robles", Username="jrobles", Password="Password"},
      new User{Id=2, Email="Pilar.Lopez@email.com", Name="Pilar Lopez", Username="plopez", Password="Password"},
      new User{Id=3, Email="Felipe.Daza@email.com", Name="Felipe Daza", Username="fdaza", Password="Password"},
    };
    numUsers = _userList.Count;
  }
}
```
 
c. Modifique la acción **Index** estableciendo el tipo de metodo a **HttpGet**,  para simular la respuesta y establezca la vista y asigne el objeto del modelo a la vista, así: 

```csharp
// GET: UsersController
[HttpGet]
public ActionResult Index()
{
  // Set Object Model
  return View(_userList);
}
```

d. Modifiquemos la vista principal **_Layout.cshtml** que se encuetnra dentro de **Views/Shared** y agregue la opción de usuarios en el menu principal adicionando un nuevo item de lista así:

```html
<li class="nav-item">
    <a class="nav-link text-dark" asp-area="" asp-controller="Users" asp-action="Index">Users</a>
</li>
``` 

e. Ejecute la aplicación presionando **F5** y valide los resultados, redireccionando de la ruta **/Users**.

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-16.png)

En este punto podemos aplicar los cambios aprendidos en la sesión anterior y mejorar nuestra vista, de la siguiente forma

```csharp
@model IEnumerable<WebDev.Application.Models.User>
@{
    ViewData["Title"] = "UserListView";
}

<div class="container">
    <h1>User List</h1>
    <p>
        <a asp-action="Create" class="btn btn-success">Create New</a>
    </p>
</div>

<div class="container">
    <table class="table table-bordered" id="usersTable" width="100%" cellspacing="0">
        <thead>
            <tr>
                <th>
                    @Html.DisplayNameFor(model => model.Id)
                </th>
                <th>
                    @Html.DisplayNameFor(model => model.Email)
                </th>
                <th>
                    @Html.DisplayNameFor(model => model.Name)
                </th>
                <th>
                    @Html.DisplayNameFor(model => model.Username)
                </th>
                <th>
                    @Html.DisplayNameFor(model => model.Password)
                </th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach (var item in Model)
            {
                <tr>
                    <td>
                        @Html.DisplayFor(modelItem => item.Id)
                    </td>
                    <td>
                        @Html.DisplayFor(modelItem => item.Email)
                    </td>
                    <td>
                        @Html.DisplayFor(modelItem => item.Name)
                    </td>
                    <td>
                        @Html.DisplayFor(modelItem => item.Username)
                    </td>
                    <td>
                        @Html.DisplayFor(modelItem => item.Password)
                    </td>
                    <td>
                        <a class="btn btn-outline-primary" asp-action="Edit" asp-route-id="@item.Id">Edit</a>
                        <a class="btn btn-outline-info" asp-action="Details" asp-route-id="@item.Id">Details</a>
                        <a class="btn btn-outline-danger" asp-action="Delete" asp-route-id="@item.Id">Delete</a>
                    </td>
                </tr>
            }
        </tbody>
    </table>
</div>
```
17. Con esto podemos mejorar la presentación de nuestra tabla usando los componentes de Bootstrap que ya estan instalados por defecto en la aplicacion y que son inicializados en el formulario de **_Layout.cshtml**.

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-17.png)

## Las otras Acciones
Ahora vamos a implementar la demas acciones para completar el CRUD. Iniciaremos por la opción de **Create New**.

En el controlador y sobre cada uno de los metodos, presione click derecho y escoja la opción **Add View...**, esto le dara como resultado que se agregaran las vistas por cada acción. Tenga presente el seleccionar siempre el Template correspondiente a la Acción que esta creando, es decir, si esta adicionando la Vista para **Details**, el template seleccionado debe ser el de **Details** y asi para todos los casos, ademas, debe estar seguro siempre de seleccionar el mismo modelo de **User** y no otro porque se pueden generar errores. En caso de que esto ultimo suceda, lo que debe hacer es borrar el archivo resultante de la carpeta de **Views** y volver a generar. Al finalizar usted tendra algo como lo siguiente, en la carpeta de **Views**. 

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-18.png)

Ahora pasaremos a realizar las modificaciones sobre cada accion, dentro del controlador y sobre la vista, segun corresponda.

### Create
1. A nivel del controlador realice los siguientes cambios para la acción de create.

```csharp
// GET: UsersController/Create
[HttpGet]
public ActionResult Create()
{
  return View();
}

// POST: UsersController/Create
[HttpPost]
[ValidateAntiForgeryToken]
public ActionResult Create(User user)
{
  try
  {
    if (ModelState.IsValid)
    {
      user.Id = ++numUsers;
      _userList.Add(user);
    }

    return RedirectToAction(nameof(Index));
  }
  catch
  {
    return View();
  }
}
```

- La funcion **Create** inicial se le adiciona la accion **HttpGet** para garantizar su llamado.
- A la funcion **Create** POST, se modifica el parámetro para recibir un objeto del Modelo, en este caso seria **User user**
- Se valida que el modelo este correcto y se realiza la adicion del nuevo objeto **User** a la lista global.

2. A nivel de la vista, se oculta el campo **Id** y se modifican los demas campos, para que sean requeridos y se les adiciona el las propiedades de place-holder y type, según corresponda, así:

```html
@model WebDev.Application.Models.User

@{
    ViewData["Title"] = "Create";
}

<h1>Create</h1>

<h4>User</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form asp-action="Create">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <input type="hidden" value="Id" />
            <div class="form-group">
                <label asp-for="Email" class="control-label"></label>
                <input asp-for="Email" type="email" id="txtEmail" name="email" placeholder="username@domain.com" required class="form-control" />
                <span asp-validation-for="Email" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Name" class="control-label"></label>
                <input asp-for="Name" type="text" id="txtName" name="name" placeholder="Julio Robles" required class="form-control" />
                <span asp-validation-for="Name" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Username" class="control-label"></label>
                <input asp-for="Username" type="text" id="txtUsername" name="username" placeholder="username" required class="form-control" />
                <span asp-validation-for="Username" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Password" class="control-label"></label>
                <input asp-for="Password" type="password" id="txtPassword" name="password" required class="form-control" />
                <span asp-validation-for="Password" class="text-danger"></span>
            </div>
            <div class="form-group">
                <input type="submit" value="Create" class="btn btn-primary" />
                <a asp-action="Index" class="btn btn-outline-info">Back to List</a>
            </div>
        </form>
    </div>
</div>
```

## Edit
1.  A nivel del controlador realice los siguientes cambios para la acción de Edit.

```csharp
// GET: UsersController/Edit/5
[HttpGet]
public ActionResult Edit(int id)
{
  var userFound = _userList.FirstOrDefault(u => u.Id == id);

  if (userFound == null)
  {
    return NotFound();
  }

  return View(userFound);
}

// POST: UsersController/Edit/5
[HttpPost]
[ValidateAntiForgeryToken]
public ActionResult Edit(User user)
{
  try
  {
    if (ModelState.IsValid)
    {
      var userFound = _userList.FirstOrDefault(u => u.Id == user.Id);
      userFound.Email = user.Email;
      userFound.Name = user.Name;
      userFound.Username = user.Username;
      userFound.Password = user.Password;

      return RedirectToAction(nameof(Index));
    }
    return View(user);
  }
  catch
  {
    return View();
  }
}

```
- Asegurese de adicionar la libreria de LinQ **using System.Linq;**
- Marque el Metodo Edit como **HttpGet** para traer los datos a editar
- Modifique el Metodo POST para que resiba un **User** y realice las validaciones del caso.

2. A nivel de la vista

- Deje el campo Id como readonly
- Modifique los demas campos como en el formulario de Create, poniendolos requeridos y completando las demas propiedades de diseño.

```html
@model WebDev.Application.Models.User

@{
    ViewData["Title"] = "Edit";
}

<h1>Edit</h1>

<h4>User</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form asp-action="Edit">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <div class="form-group">
                <label asp-for="Id" class="control-label"></label>
                <input asp-for="Id" class="form-control" readonly/>
                <span asp-validation-for="Id" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Email" class="control-label"></label>
                <input asp-for="Email" type="email" id="txtEmail" name="email" placeholder="username@domain.com" required class="form-control" />
                <span asp-validation-for="Email" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Name" class="control-label"></label>
                <input asp-for="Name" type="text" id="txtName" name="name" placeholder="Julio Robles" required class="form-control" />
                <span asp-validation-for="Name" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Username" class="control-label"></label>
                <input asp-for="Username" type="text" id="txtUsername" name="username" placeholder="username" required class="form-control" />
                <span asp-validation-for="Username" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="Password" class="control-label"></label>
                <input asp-for="Password" type="password" id="txtPassword" name="password" required class="form-control" />
                <span asp-validation-for="Password" class="text-danger"></span>
            </div>
            <div class="form-group">
                <input type="submit" value="Save" class="btn btn-primary" />
                <a asp-action="Index" class="btn btn-outline-info">Back to List</a>
            </div>
        </form>
    </div>
</div>
```

## Details
1. A nivel del controlador realice los siguientes cambios para la acción de Details.

```csharp
// GET: UsersController/Details/5
[HttpGet]
public ActionResult Details(int id)
{
  var userFound = _userList.FirstOrDefault(u => u.Id == id);

  if (userFound == null)
  {
    return NotFound();
  }

  return View(userFound);
}
```
- En este punto solo se adiciona la accion **HttpGet** al inicio de la funcion
- Se realizan las acciones corespondientes para el flujo del caso.

2. a nivel de la vista 
- Cambie el llamado al metodo Html y el enlace de Back

```html
@Html.ActionLink("Edit", "Edit", new { /* id = Model.PrimaryKey */ }) 
```

por una referencia sencilla así:

```html
<div>
    <a class="btn btn-outline-primary" asp-action="Edit" asp-route-id="@Model.Id">Edit</a>
    <a asp-action="Index" class="btn btn-outline-info">Back to List</a>
</div>
```

## Delete

1. A nivel del controlador realice los siguientes cambios para la acción de Delete.

```csharp
// GET: UsersController/Delete/5
[HttpGet]
public ActionResult Delete(int id)
{
  var userFound = _userList.FirstOrDefault(u => u.Id == id);

  if (userFound == null)
  {
    return NotFound();
  }

  return View(userFound);
}

// POST: UsersController/Delete/5
[HttpPost]
[ValidateAntiForgeryToken]
public ActionResult Delete(User user)
{
  try
  {
    var userFound = _userList.FirstOrDefault(u => u.Id == user.Id);

    if (userFound == null)
    {
      return View();
    }

    _userList.Remove(userFound);
    return RedirectToAction(nameof(Index));
  }
  catch
  {
    return View();
  }
}

```
- En este punto se marca como HttpGet el metodo de Delete Inicial
- Se cambia el tipo de parametro del Metodo delete final por **User user**
- Se realizan las validaciones correspondientes al flujo de la aplicación

2. a nivel de la vista 

Cambie los botones de la siguiente forma
```html
<form asp-action="Delete">
    <input type="submit" value="Delete" class="btn btn-danger" />
    <a asp-action="Index" class="btn btn-outline-info">Back to List</a>
</form>
```

En este momento podemos podemos ejecutar de nuevo la aplicación y validar las accones. Recuerde que estos cambios estan trabajando con datos simulados, ya que en la proxima sesión veremos como realizar el llamado a la API para intereactuar con ella y los ddatos de la base de datos directamente.

  
## Mejoras
Para facilitar el manejo de las tablas, vamos a incluir un componente llamado [datatables](https://datatables.net/), que nos añade funcionalidad a nuestra vista de **Index** sin efectuar cambios en el codigo del controlador. 

Ademas adicionaremos la libreria de iconos [Font Awesome](https://fontawesome.com/) para agregar alguna iconografia de manera facil a nuestras vistas.

1. En la vista de _layout.cshtml adicione las siguientes lineas en la sección de head al inicio del archivo.

```html
<!-- Datatables-->
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.22/css/jquery.dataTables.min.css" />
<!-- Font Awesome / Icons -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" 
      integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
```

2. En la parte baja del archivo, en la sección de scripts adiciones la siguiente linea, antes de la operación del Render, así:

```html
<script src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
@RenderSection("Scripts", required: false)
```
3. Guarde los cambios para poder hacer el llamado en las vistas.
4. En la vista de **Index.cshtml**, realice los siguientes cambios:
a. Adicione el icono del signo (+) al boton de Create New así:

```html
<a asp-action="Create" class="btn btn-success"><i class="fas fa-plus"></i> Create New</a>
```
b. Asegurese que la tabla tenga el campo **Id**, es este caso el valor es **usersTable**

c. al final del arhivo de la vista adicione las siguientes lineas:

```html
@section Scripts{
	<script>
		$(document).ready( function () {
		    $('#usersTable').DataTable();
		} );
	</script>
}
```

Vuelva a ejecutar el proyecto y valide los cambios.

![MVC](https://github.com/Jucer74/WebDev/blob/main/Sesiones/Sesion-04-MVC/MVC-19.png)

Note que ahora tiene varias nuevas funcionalidades, paginación automática, cantidad de registros, ordenamiento por cualquier columna y busqueda rapida sobre los registros.  

En nuestra siguiente sesion veremos como realizar el llamado a una libreria de servicios que nos ofrecera la posibilidad de conectarnos con la API y así traer los datos directamente desde la base de datos.


