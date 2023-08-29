using Microsoft.AspNetCore.Mvc;
using MovieRankMVC.Models;

namespace MovieRankMVC.Controllers
{
    public class UsersController : Controller
    {
        private static List<User> userList = new List<User>();

        public UsersController()
        {
            // Verificar si el usuario predeterminado ya existe
            if (!userList.Any(u => u.UserEmail == "Admin@email.com"))
            {
                userList.Add(new User
                {
                    UserEmail = "Admin@email.com",
                    FirstName = "Admin",
                    LastName = "User",
                    Password = "P4ssw0rd*01"
                });
            }
        }

        // GET: UsersController/Create
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // POST: UsersController/Create
        [HttpPost]
        public IActionResult Create(User user)
        {
            if (ModelState.IsValid)
            {
                userList.Add(user); // Agregar el usuario a la lista
                return RedirectToAction("Login"); // Redirigir a la página de inicio de sesión
            }

            // Si llegamos aquí, hay errores de validación, regresamos al formulario de registro
            return View(user);
        }

        // GET: UsersController/Login
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        // POST: UsersController/Login
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Login(IFormCollection collection)
        {
            try
            {
                string userEmail = collection["UserEmail"];
                string userPassword = collection["Password"];

                // Buscar el usuario en la lista userList
                var user = userList.Find(u => u.UserEmail == userEmail && u.Password == userPassword);

                if (user != null)
                {
                    // Si encontramos un usuario que coincide, redirigimos a la página principal
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ViewBag.ErrorMessage = "Credenciales incorrectas";
                    return View("Login");
                }
            }
            catch
            {
                ViewBag.ErrorMessage = "Ocurrió un error durante el inicio de sesión";
                return View("Login");
            }
        }
    }
}