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

## Las Vistas
Del Controlador seleccione una a una las Funciones y agregue las vistas correspondientes (Excluya las funciones marcadas como **ValidateAntiForgeryToken**)

1. **Index**
- Sobre la palabra **Index** haga click derecho y del menu contextual seleccione Adicionar Vista (**Add View...**)
- Escoja la opcion (Razor View) dentro del contexto MVC/View
- En la Ventana de Vista asigne los sigientes valores
  - **View Name**: Index
  - **Template**: List
  - **Model Class**: Student
- Adicione la Vista

2. **Details**
- Sobre la palabra **Details** haga click derecho y del menu contextual seleccione Adicionar Vista (**Add View...**)
- Escoja la opcion (Razor View) dentro del contexto MVC/View
- En la Ventana de Vista asigne los sigientes valores
  - **View Name**: Details
  - **Template**: Details
  - **Model Class**: Student
- Adicione la Vista

3. **Create**
- Sobre la palabra **Create** haga click derecho y del menu contextual seleccione Adicionar Vista (**Add View...**)
- Escoja la opcion (Razor View) dentro del contexto MVC/View
- En la Ventana de Vista asigne los sigientes valores
  - **View Name**: Create
  - **Template**: Create
  - **Model Class**: Student
- Adicione la Vista

4. **Edit**
- Sobre la palabra **Edit** haga click derecho y del menu contextual seleccione Adicionar Vista (**Add View...**)
- Escoja la opcion (Razor View) dentro del contexto MVC/View
- En la Ventana de Vista asigne los sigientes valores
  - **View Name**: Edit
  - **Template**: Edit
  - **Model Class**: Student
- Adicione la Vista

5. **Delete**
- Sobre la palabra **Delete** haga click derecho y del menu contextual seleccione Adicionar Vista (**Add View...**)
- Escoja la opcion (Razor View) dentro del contexto MVC/View
- En la Ventana de Vista asigne los sigientes valores
  - **View Name**: Delete
  - **Template**: Delete
  - **Model Class**: Student
- Adicione la Vista

