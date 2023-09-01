using BDayReminderMVC.Models;
using Microsoft.AspNetCore.Mvc;

namespace BDayReminderMVC.Controllers
{
    public class UsersController : Controller
    {
        private static List<User> usersList = new List<User>();

        // GET: UsersController
        public ActionResult Index()
        {
            return View();
        }

        // GET: UsersController/Details/5
        public ActionResult Details(int id)
        {
            var user = usersList.FirstOrDefault(x => x.Id == id);
            return View(user);
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
            // Comprueba si el correo electrónico y la contraseña ingresados coinciden con algún usuario en usersList
            try
            {
                user.Id = usersList.Count + 1;
                usersList.Add(user);
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
            var user = usersList.FirstOrDefault(x => x.Id == id);
            return View(user);
        }

        // POST: UsersController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, User user)
        {
            try
            {
                var elementIndex = usersList.FindIndex(i => i.Id == id);
                usersList[elementIndex] = user;
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
            var user = usersList.FirstOrDefault(x => x.Id == id);
            return View(user);
        }

        // POST: UsersController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, User user)
        {
            try
            {
                var userDelete = usersList.FirstOrDefault(x => x.Id == user.Id);
                usersList.Remove(userDelete);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // POST: UsersController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(User user)
        {
            // Comprueba si el correo electrónico y la contraseña ingresados coinciden con algún usuario en usersList
            var existingUser = usersList.FirstOrDefault(u => u.UserEmail == user.UserEmail && u.Password == user.Password);

            if (existingUser != null)
            {
                // Si existe un usuario coincidente, redirige a la acción Index
                return RedirectToAction("Index", "Home", new { area = "" });
            }

            // Si no hay un usuario coincidente, agrega un mensaje de error al ModelState
            ModelState.AddModelError(string.Empty, "Invalid login attempt.");

            // Redisplay the form with the error message
            return View("Index");
        }
    }
}