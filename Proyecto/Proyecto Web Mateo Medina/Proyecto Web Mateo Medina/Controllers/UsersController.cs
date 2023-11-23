using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Proyecto_Web_Mateo_Medina.Controllers
{
    public class UsersController : Controller
    {
        // GET: UsersController
        public ActionResult Index()
        {
            return View();
        }

        // GET: UsersController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: UsersController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: UsersController/Create
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

        // GET: UsersController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: UsersController/Edit/5
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

        // GET: UsersController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: UsersController/Delete/5
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

        // Lista estática para almacenar datos de usuarios (simulando una base de datos)
        private static List<User> usuariosRegistrados = new List<User>();

        // Acción para la vista de registro de usuario
        public ActionResult Registro()
        {
            return View();
        }

        // Acción para el proceso de registro de usuario
        [HttpPost]
        public ActionResult Registro(User newUser)
        {
            if (ModelState.IsValid)
            {
                // Verificar si el usuario ya está registrado
                if (usuariosRegistrados.Any(u => u.UserEmail == newUser.UserEmail))
                {
                    ViewBag.Error = "El correo electrónico ya está registrado.";
                    return View("Index");
                }

                // Agregar nuevo usuario a la lista de usuarios registrados
                usuariosRegistrados.Add(newUser);

                // Redirigir a la página principal (Index) después del registro exitoso
                return RedirectToAction("Index");
            }

            return View(newUser);
        }

        // Acción para el proceso de inicio de sesión
        [HttpPost]
        public ActionResult Login(string userEmail, string password)
        {
            // Verificar si las credenciales coinciden con algún usuario registrado
            var user = usuariosRegistrados.FirstOrDefault(u => u.UserEmail == userEmail && u.Password == password);

            if (user != null)
            {
                // Autenticación exitosa, redirigir al LandingPage
                return RedirectToAction("LandingPage");
            }

            // Autenticación fallida, mostrar mensaje de error
            ViewBag.Error = "Credenciales inválidas. Por favor, intenta de nuevo.";
            return View("Index");
        }
        public ActionResult LandingPage()
        {
            return View();
        }

    }

    // Modelo de Usuario (simulando una entidad de base de datos)
    public class User
    {
        public string UserEmail { get; set; }
        public string Password { get; set; }
        // Otros campos según tu necesidad (nombre, apellidos, etc.)
    }
}

