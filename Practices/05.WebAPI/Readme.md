# WebAPI
Implemente una aplicacion de tipo MVC, patra manipular los datos de los Studiantes, que consuma los datos de un servidor de tipo json-server, mediante el uso de REST.

## Json-Server
Utilizando el archivo en **JDATA.json** de la carpeta server, ejecute el siguiente comando para levantar el servidor en una ventana de terminal

```
cd server
json-server --watch JDATA.json
```

## MVC Application
Utilizando la aplicacion **SchoolMVC** consuma los datos del servidor JSON, mediante el uso de los Metodos REST.

### El Modelo
En la carpeta de Models adiciona una nueva clase llamada **Students** asi:

```csharp
public class Student
{
    public int Id { get; set; } = 0;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public DateTime DateOfBirth { get; set; } = default!;
    public char Sex { get; set; } = 'M';
}
```

## El Controlador
En la carpeta de Controllers adicione un nuevo controlador llamado **StudentsController** de tipo MVC con acciones de lectura y escritura:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace SchoolMVC.Controllers
{
    public class StudentsController : Controller
    {
        // GET: StudentsController
        public ActionResult Index()
        {
            return View();
        }

        // GET: StudentsController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: StudentsController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: StudentsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: StudentsController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: StudentsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: StudentsController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: StudentsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
```

Adicionamos la Opcion **Students** al menu principal, para ello modificamos la vista **_layout.cshtml** que esta dentro del directio **Views/Shared** y agregamos el siguiente codigo jsto despues del la opcion de **Privacy**

```html
<li class="nav-item">
    <a class="nav-link text-dark" asp-area="" asp-controller="Students" asp-action="Index">Students</a>
</li>
```


## Las Vistas y Acciones
Del Controlador seleccione una a una las Funciones y agregue las vistas correspondientes (Excluya las funciones marcadas como **ValidateAntiForgeryToken**)

### 1. **Index**

**La Vista**
- Sobre la palabra **Index** haga click derecho y del menu contextual seleccione Adicionar Vista (**Add View...**)
- Escoja la opcion (Razor View) dentro del contexto MVC/View
- En la Ventana de Vista asigne los sigientes valores
  - **View Name**: Index
  - **Template**: List
  - **Model Class**: Student
- Adicione la Vista

**El Controlador**
- Volvemos al Controlador y vamos a simular la respuesta para validar nuestra ejecución, así:
- Adicione las librerias para manejo de lista y para el uso del modelo
```csharp
using Microsoft.AspNetCore.Mvc;
using SchoolMVC.Models;
```
-  Adicione un atributo de clase para la lista de estudiantes y Cree un constructor para la clase controlador y adicione elementos para la clase para simular los datos de los usuarios.
```csharp
private static List<Student> studentList;
private static int numStudents;
public StudentsController()
{
    // Mock Student List
    if (studentList is null)
    {
        studentList = new List<Student>()
        {
            new Student{Id=1, FirstName="Julio", LastName="Robles", DateOfBirth=DateTime.Parse("10-08-1974"), Sex='M'},
            new Student{Id=2, FirstName="Pilar", LastName="Lopez", DateOfBirth=DateTime.Parse("04-10-1976"), Sex='F'},
            new Student{Id=3, FirstName="Felipe", LastName="Daza", DateOfBirth=DateTime.Parse("07-27-1996"), Sex='M'},
        };

        numStudents = studentList.Count;
    }
}
```
- Modifique la acción **Index** para simular la respuesta pasando la lista de usuario como el modelo de la vista, así:
```csharp
// GET: StudentsController
public ActionResult Index()
{
    return View(studentList);
}
```
-  Ejecute la aplicación presionando **F5** y valide los resultados, seleccionando la opcion de **Students** del menu principal.

-  Mejore la vista **Index** usando las clases de Bootstrap para los botones

```csharp
@model IEnumerable<SchoolMVC.Models.Student>

@{
    ViewData["Title"] = "Index";
}

<h1>Index</h1>

<p>
    <a asp-action="Create" class="btn btn-success">Create New</a>
</p>

<table class="table">
    <thead>
        <tr>
            <th>
                @Html.DisplayNameFor(model => model.Id)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.FirstName)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.LastName)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.DateOfBirth)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Sex)
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
@foreach (var item in Model) {
        <tr>
            <td>
                @Html.DisplayFor(modelItem => item.Id)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.FirstName)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.LastName)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.DateOfBirth)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Sex)
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
```
___
### 2. **Create**
- Sobre la palabra **Create** haga click derecho y del menu contextual seleccione Adicionar Vista (**Add View...**)
- Escoja la opcion (Razor View) dentro del contexto MVC/View
- En la Ventana de Vista asigne los sigientes valores
  - **View Name**: Create
  - **Template**: Create
  - **Model Class**: Student
- Adicione la Vista

___
### 3. **Details**
- Sobre la palabra **Details** haga click derecho y del menu contextual seleccione Adicionar Vista (**Add View...**)
- Escoja la opcion (Razor View) dentro del contexto MVC/View
- En la Ventana de Vista asigne los sigientes valores
  - **View Name**: Details
  - **Template**: Details
  - **Model Class**: Student
- Adicione la Vista

___
### 4. **Edit**
- Sobre la palabra **Edit** haga click derecho y del menu contextual seleccione Adicionar Vista (**Add View...**)
- Escoja la opcion (Razor View) dentro del contexto MVC/View
- En la Ventana de Vista asigne los sigientes valores
  - **View Name**: Edit
  - **Template**: Edit
  - **Model Class**: Student
- Adicione la Vista

___
### 5. **Delete**
- Sobre la palabra **Delete** haga click derecho y del menu contextual seleccione Adicionar Vista (**Add View...**)
- Escoja la opcion (Razor View) dentro del contexto MVC/View
- En la Ventana de Vista asigne los sigientes valores
  - **View Name**: Delete
  - **Template**: Delete
  - **Model Class**: Student
- Adicione la Vista

