using BDayReminderMVC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BDayReminderMVC.Controllers
{
    public class UsersController : Controller
    {
        private static List<User> usersList = LoadUsers();

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
        public ActionResult Create(User user)
        {
            try
            {
                if (!usersList.Any(u => u.UserMail == user.UserMail))
                {

                    var idNew = usersList.Count + 1;
                    user.Id = idNew;

                    usersList.Add(user);


                    return RedirectToAction(nameof(Login)); //EDITAR PARA PONER INDEX
                }
                else
                {
                    ModelState.AddModelError("UserMail", "The UserMail address is already in use.");
                }

                //return RedirectToAction(nameof(Create)); //EDITAR PARA PONER INDEX
                return View(user);
            }
            catch
            {
                return View();
            }
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
        public IActionResult Login(User user)
        {
            var authenticatedUser = usersList.Find(u => u.UserMail == user.UserMail && u.Password == user.Password);

            if (authenticatedUser != null)
            {
                // El usuario está autenticado, puedes implementar la lógica de autenticación aquí.
                // Por ejemplo, configurar una cookie de autenticación o usar el sistema de autenticación de ASP.NET Core.

                // Redirigir al usuario a la página de inicio u otra página según tus necesidades.
                return RedirectToAction("Index", "Home"); // Cambia "Index" a la página de inicio real
            }
            else
            {
                TempData["ErrorMessage"] = "Incorrect UserMail or Password.";
                return View(user);
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

        private static List<User> LoadUsers()
        {

            List<User> users = new List<User>();
            users.Add(new User() { Id = 1, UserMail = "admin@gmail.com", FirstName = "Admin", LastName = "Admin", Password = "Admin" });
            return users;
        }

    }
}
