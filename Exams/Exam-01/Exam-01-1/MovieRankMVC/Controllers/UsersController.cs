using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieRankMVC.Models;

namespace MovieRankMVC.Controllers
{
    public class UsersController : Controller
    {
        // GET: HomeController1

        private static List<User> usersList = LoadUsers();

        public ActionResult Index()
        {
            return View();
        }

        // GET: HomeController1/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: UsersController/Create
        public ActionResult Create()
        {
            return View(new User()); 
        }

        // GET: HomeController1/Create
        public ActionResult Login()
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

                foreach (var usario in usersList)
                {
                    if (user.UserEmail == usario.UserEmail)
                    {
                        TempData["Message"] = $"User with email '{usario.UserEmail}' no valido, ya existe";
                        return View();
                    }
                }
                if (ModelState.IsValid)
                {
                    if (user.Password == user.ConfirmPassword)
                    {
                        usersList.Add(user);
                        return View("Login");
                    }
                    else
                    {
                        ModelState.AddModelError("ConfirmPassword", "Password do not match.");
                        ModelState.AddModelError("Password", "Confirm Password do not match.");
                    }
                }
                return View(user);
            }
            catch
            {
                return View();
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(IFormCollection collection)
        {
            try
            {
                string userEmail = collection["UserEmail"];
                string userPassword = collection["Password"];

                User user = usersList.FirstOrDefault(u => u.UserEmail == userEmail);

                if (user != null && user.Password.Equals(userPassword))
                {
                    // Acceso exitoso, redirigir a la página principal

                    TempData["UserEmail"] = userEmail;
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ModelState.AddModelError("", "Credenciales inválidas");
                    return View("Login");
                }
            }
            catch (Exception ex)
            {
                // Manejar errores de manera adecuada (log, notificación, etc.)
                ModelState.AddModelError("", "Error en el proceso de inicio de sesión: " + ex.Message);
                return View();
            }
        }

        // GET: HomeController1/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: HomeController1/Edit/5
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

        // GET: HomeController1/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: HomeController1/Delete/5
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

        #region Private-Methods
        private static List<User> LoadUsers()
        {
            List<User> movies = new List<User>();

            movies.Add(new User() { Id = 1 ,FirstName = "Admin", LastName = "User", UserEmail = "Admin@email.com", Password = "P4ssw0rd*01", ConfirmPassword = "P4ssw0rd*01" });

            return movies;
        }
        #endregion Private-Methods
    }
}
