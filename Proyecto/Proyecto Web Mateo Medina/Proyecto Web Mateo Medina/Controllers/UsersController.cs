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

        // Acción para iniciar sesión
        [HttpPost]
        public ActionResult Login(string userEmail, string password)
        {
            // Lógica de autenticación - aquí se debe implementar la lógica de verificación de credenciales
            if (userEmail == "correo@ejemplo.com" && password == "contraseña") // Comprobación de credenciales (ejemplo simplificado)
            {
                // Si las credenciales son válidas, se redirige al LandingPage (por ejemplo)
                return RedirectToAction("LandingPage");
            }

            // Si las credenciales son inválidas, se muestra el mensaje de error y se vuelve a la página principal (Index)
            ViewBag.Error = "Credenciales inválidas. Por favor, intenta de nuevo.";
            return View("Index");
        }

        // Acción para la página de aterrizaje (LandingPage)
        public ActionResult LandingPage()
        {
            return View(); // Vista LandingPage.cshtml
        }

        // Acción para el registro de usuarios
        [HttpPost]
        public ActionResult Registro(string userEmail, string firstName, string lastName, string password)
        {
            // Lógica de registro de usuarios - aquí se debe implementar la lógica para almacenar los datos del nuevo usuario
            // En este ejemplo, simplemente redirigimos al Index después del registro exitoso
            ViewBag.Success = "¡Registro exitoso! Por favor, inicia sesión.";
            return View("Index");
        }
    }
}
