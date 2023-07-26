# WebAPI
Implemente una aplicacion de tipo MVC, patra manipular los datos de los estudiantes, que consuma los datos de un servidor de tipo json-server, mediante el uso de REST.

## Json-Server
Utilizando el archivo en **JDATA.json** de la carpeta server, ejecute el siguiente comando para levantar el servidor en una ventana de terminal

```
cd server
json-server --watch JDATA.json
```

## MVC Application
Utilizando la aplicacion **SchoolMVC** consuma los datos del servidor JSON, mediante el uso de los Metodos REST.

### El Modelo
En la carpeta de Models adicione una nueva clase llamada **Students** asi:

```csharp
public class Student
{
    [Required(ErrorMessage ="El Id es requerido")]
    [DisplayName("Id")]
    public int Id { get; set; } = 0;
    
    [Required(ErrorMessage ="El Nombre es requerido")]
    [StringLength(50,ErrorMessage="La Longitud maxima del Nombre es de 50 caracteres")]
    [DisplayName("Nombre")]
    public string FirstName { get; set; } = null!;

    [Required(ErrorMessage = "El Apellido es requerido")]
    [StringLength(50, ErrorMessage = "La Longitud maxima del Apellido es de 50 caracteres")]
    [DisplayName("Apellido")]
    public string LastName { get; set; } = null!;

    [Required(ErrorMessage = "La fecha de Nacimiento es requerida")]
    [DataType(DataType.Date)]
    [DisplayName("Fecha de Nacimiento")]
    [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
    public DateTime DateOfBirth { get; set; } = default!;

    [Required(ErrorMessage = "El Sexo es requerido")]
    [RegularExpression("^[MF]$", ErrorMessage ="Los Valores permitidos para Sex son M o F")]
    [DisplayName("Sexo")]
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
    <a class="nav-link text-dark" asp-area="" asp-controller="Students" asp-action="Index">Estudiantes</a>
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
- Adicione la Vista y mejore su presentación usando Bootstrap así:

```csharp
@model IEnumerable<SchoolMVC.Models.Student>

@{
    ViewData["Title"] = "Index";
}

<h1>Lista</h1>

<p>
    <a asp-action="Create" class="btn btn-success">Adicionar</a>
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
                <a class="btn btn-primary" asp-action="Edit" asp-route-id="@item.Id">Edit</a>
                <a class="btn btn-info" asp-action="Details" asp-route-id="@item.Id">Details</a>
                <a class="btn btn-danger" asp-action="Delete" asp-route-id="@item.Id">Delete</a>
            </td>
        </tr>
}
    </tbody>
</table>
```

**El Controlador**<br>
Volvemos al Controlador y vamos a simular la respuesta para validar nuestra ejecución, así:
- Adicione las librerias para manejo de lista y para el uso del modelo
```csharp
using Microsoft.AspNetCore.Mvc;
using SchoolMVC.Models;
```
-  Adicione un atributo de clase para la lista de estudiantes y Cree un constructor para la clase controlador y adicione elementos para la clase para simular los datos de los usuarios.
```csharp
private static List<Student> studentList= null!;
private static int numStudents;
public StudentsController()
{
    // Mock Student List
    if (studentList is null)
    {
        studentList = new List<Student>()
        {
            new Student{Id=1, FirstName="Carlos", LastName="Lopez", DateOfBirth=DateTime.Parse("10/08/1974"), Sex='M'},
            new Student{Id=2, FirstName="Pilar", LastName="Jaramillo", DateOfBirth=DateTime.Parse("04/10/1976"), Sex='F'},
            new Student{Id=3, FirstName="Oscar", LastName="Rios", DateOfBirth=DateTime.Parse("07/27/1996"), Sex='M'},
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
-  Ejecute la aplicación presionando **F5** y valide los resultados, seleccionando la opcion de **Estudiantes** del menu principal.

___
### 2. **Create**

**La Vista**
- Sobre la palabra **Create** haga click derecho y del menu contextual seleccione Adicionar Vista (**Add View...**)
- Escoja la opcion (Razor View) dentro del contexto MVC/View
- En la Ventana de Vista asigne los sigientes valores
  - **View Name**: Create
  - **Template**: Create
  - **Model Class**: Student
- Adicione la Vista y mejore su presentación usando Bootstrap así:

```csharp
@model SchoolMVC.Models.Student

@{
    ViewData["Title"] = "Adicionar";
}

<h1>Adicionar</h1>

<h4>Estudiante</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form asp-action="Create">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <div class="form-group">
                <input type="hidden" value="Id" />
            </div>
            <div class="form-group">
                <label asp-for="FirstName" class="control-label"></label>
                <input asp-for="FirstName" class="form-control" />
                <span asp-validation-for="FirstName" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="LastName" class="control-label"></label>
                <input asp-for="LastName" class="form-control" />
                <span asp-validation-for="LastName" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="DateOfBirth" class="control-label"></label>
                <input asp-for="DateOfBirth" class="form-control" />
                <span asp-validation-for="DateOfBirth" class="text-danger"></span>
            </div>
            <div class="form-group">
                @Html.LabelFor(model => model.Sex, htmlAttributes: new { @class = "control-label" })
                <div class="col-md-10">
                    @Html.RadioButtonFor(model => model.Sex, "M" ) M
                    @Html.RadioButtonFor(model => model.Sex, "F" ) F
                </div>
            </div>
            <div class="form-group pt-md-4">
                <input type="submit" value="Adicionar" class="btn btn-primary" />
                <a class="btn btn-outline-info" asp-action="Index">Volver</a>
            </div>
        </form>
    </div>
</div>


@section Scripts {
    @{await Html.RenderPartialAsync("_ValidationScriptsPartial");}
}
```

**El Controlador**<br>
A nivel del controlador realice los siguientes cambios:

- Modifique las acciones
```csharp
// GET: StudentsController/Create
public ActionResult Create()
{
    var student = new Student();
    student.DateOfBirth = DateTime.Today;
    student.Sex = 'M';
    return View(student);
}

// POST: StudentsController/Create
[HttpPost]
[ValidateAntiForgeryToken]
public ActionResult Create(Student student)
{
    try
    {
        if (ModelState.IsValid)
        {
            student.Id = ++numStudents;
            studentList.Add(student);
        }

        return RedirectToAction(nameof(Index));
    }
    catch
    {
        return View();
    }
}
```  
___
### 3. **Details**

**La Vista**
- Sobre la palabra **Details** haga click derecho y del menu contextual seleccione Adicionar Vista (**Add View...**)
- Escoja la opcion (Razor View) dentro del contexto MVC/View
- En la Ventana de Vista asigne los sigientes valores
  - **View Name**: Details
  - **Template**: Details
  - **Model Class**: Student
- Adicione la Vista y mejore su presentacion usando bootstrap así:
```csharp
@model SchoolMVC.Models.Student

@{
    ViewData["Title"] = "Detalles";
}

<h1>Detalles</h1>

<div>
    <h4>Estudiante</h4>
    <hr />
    <dl class="row">
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.Id)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.Id)
        </dd>
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.FirstName)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.FirstName)
        </dd>
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.LastName)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.LastName)
        </dd>
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.DateOfBirth)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.DateOfBirth)
        </dd>
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.Sex)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.Sex)
        </dd>
    </dl>
</div>
<div>
    <a class="btn btn-primary" asp-action="Edit" asp-route-id="@Model.Id">Editar</a>
    <a asp-action="Index" class="btn btn-outline-info">Volver</a>
</div>

```

**El Controlador**<br>
A Nivel del controlador

```csharp
// GET: StudentsController/Details/5
public ActionResult Details(int id)
{
    var studentFound = studentList.FirstOrDefault(u => u.Id == id);

    if (studentFound == null)
    {
        return NotFound();
    }

    return View(studentFound);
}
```
___
### 4. **Edit**

**La Vista**
- Sobre la palabra **Edit** haga click derecho y del menu contextual seleccione Adicionar Vista (**Add View...**)
- Escoja la opcion (Razor View) dentro del contexto MVC/View
- En la Ventana de Vista asigne los sigientes valores
  - **View Name**: Edit
  - **Template**: Edit
  - **Model Class**: Student
- Adicione la Vista y mejore su presentacion usando bootstrap así:

```csharp
@model SchoolMVC.Models.Student

@{
    ViewData["Title"] = "Editar";
}

<h1>Editar</h1>

<h4>Estudiante</h4>
<hr />
<div class="row">
    <div class="col-md-4">
        <form asp-action="Edit">
            <div asp-validation-summary="ModelOnly" class="text-danger"></div>
            <div class="form-group">
                <label asp-for="Id" class="control-label"></label>
                <input asp-for="Id" class="form-control" readonly />
                <span asp-validation-for="Id" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="FirstName" class="control-label"></label>
                <input asp-for="FirstName" class="form-control" />
                <span asp-validation-for="FirstName" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="LastName" class="control-label"></label>
                <input asp-for="LastName" class="form-control" />
                <span asp-validation-for="LastName" class="text-danger"></span>
            </div>
            <div class="form-group">
                <label asp-for="DateOfBirth" class="control-label"></label>
                <input asp-for="DateOfBirth" class="form-control" />
                <span asp-validation-for="DateOfBirth" class="text-danger"></span>
            </div>
            <div class="form-group">
                @Html.LabelFor(model => model.Sex, htmlAttributes: new { @class = "control-label" })
                <div class="col-md-10">
                    @Html.RadioButtonFor(model => model.Sex, "M" ) M
                    @Html.RadioButtonFor(model => model.Sex, "F" ) F
                </div>
            </div>
            <div class="form-group pt-md-4">
                <input type="submit" value="Guardar" class="btn btn-primary" />
                <a asp-action="Index" class="btn btn-outline-info">Back to List</a>
            </div>
        </form>
    </div>
</div>

@section Scripts {
    @{await Html.RenderPartialAsync("_ValidationScriptsPartial");}
}

```

**El Controlador**<br>
En el controlador cambie las acciones así:

```csharp
// GET: StudentsController/Edit/5
public ActionResult Edit(int id)
{
    var studentFound = studentList.FirstOrDefault(u => u.Id == id);

    if (studentFound == null)
    {
        return NotFound();
    }

    return View(studentFound);
}

// POST: StudentsController/Edit/5
[HttpPost]
[ValidateAntiForgeryToken]
public ActionResult Edit(Student student)
{
    try
    {
        if (ModelState.IsValid)
        {
            var studentFound = studentList.FirstOrDefault(u => u.Id == student.Id);
            
            if(studentFound == null)
            {
                return View();
            }

            studentFound.FirstName= student.FirstName;
            studentFound.LastName = student.LastName;
            studentFound.DateOfBirth = student.DateOfBirth;
            studentFound.Sex= student.Sex;

            return RedirectToAction(nameof(Index));
        }

        return View(student);
    }
    catch
    {
        return View();
    }
}

```
___
### 5. **Delete**

**La Vista**
- Sobre la palabra **Delete** haga click derecho y del menu contextual seleccione Adicionar Vista (**Add View...**)
- Escoja la opcion (Razor View) dentro del contexto MVC/View
- En la Ventana de Vista asigne los sigientes valores
  - **View Name**: Delete
  - **Template**: Delete
  - **Model Class**: Student
- Adicione la Vista y mejore su presentacion usando Bootstrap así:

```csharp
@model SchoolMVC.Models.Student

@{
    ViewData["Title"] = "Eliminar";
}

<h1>Eliminar</h1>

<h3>Esta seguro de Eliminar este registro?</h3>
<div>
    <h4>Estudent</h4>
    <hr />
    <dl class="row">
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.Id)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.Id)
        </dd>
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.FirstName)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.FirstName)
        </dd>
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.LastName)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.LastName)
        </dd>
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.DateOfBirth)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.DateOfBirth)
        </dd>
        <dt class = "col-sm-2">
            @Html.DisplayNameFor(model => model.Sex)
        </dt>
        <dd class = "col-sm-10">
            @Html.DisplayFor(model => model.Sex)
        </dd>
    </dl>
    
    <form asp-action="Delete">
        <div class="form-group pt-md-4">
            <input type="submit" value="Eliminar" class="btn btn-danger" /> 
            <a asp-action="Index" class="btn btn-outline-info">Volver</a>
        </div>
    </form>
</div>
```


**El Controlador**<br>
Actualice el controlador así:

```csharp
// GET: StudentsController/Delete/5
public ActionResult Delete(int id)
{
    var studentFound = studentList.FirstOrDefault(u => u.Id == id);

    if (studentFound == null)
    {
        return NotFound();
    }

    return View(studentFound);
}

// POST: StudentsController/Delete/5
[HttpPost]
[ValidateAntiForgeryToken]
public ActionResult Delete(Student student)
{
    try
    {
        var studentFound = studentList.FirstOrDefault(u => u.Id == student.Id);

        if (studentFound == null)
        {
            return View();
        }


        studentList.Remove(studentFound);
        return RedirectToAction(nameof(Index));
    }
    catch
    {
        return View();
    }
}
```

- Ejecute la aplicacion Presionando **F5** y compruebe que todas lascciones y metodos funcionan corectamente.

## El Servicio
Ahora vamos a incluir un Servicio que permita interactuar con el servidor (json-server) y administrar los datos. <br>
Para ello cree una nueva carpeta llamada **Services** y adicione una clse llamada **StudentService** con el siguiente contenido: <br>

```csharp
using SchoolMVC.Models;

namespace SchoolMVC.Services;

public class StudentService
{
	public StudentService()
	{

	}

	public async Task<List<Student>> GetAll()
	{
		throw new NotImplementedException();
	}

	public async Task<Student> GetById(int id)
	{
        throw new NotImplementedException();
    }

	public async Task<Student> CreateStudent(Student student)
	{
        throw new NotImplementedException();
    }

    public async Task<Student> EditStudent(int id, Student student)
    {
        throw new NotImplementedException();
    }

    public async Task DeleteStudent(int id)
    {
        throw new NotImplementedException();
    }
}
```
Complete los Metodos de la clase utilizando el llamado de las funciones REST correspondientes y utilice el componente RestSharp para facilitar la operacion.



