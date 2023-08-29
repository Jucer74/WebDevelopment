using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieRankMVC.Models;
using System.Collections.Generic;
using System.Linq;

namespace MovieRankMVC.Controllers
{
    public class UsersController : Controller
    {

        private static List<User> usersList = LoadUsers();


        private static List<User> LoadUsers()
        {
            List<User> users = new List<User>();

            users.Add(new User() { Id = 1, UserEmail = "admin@email.com", FirstName = "Admin", LastName = "User", Password = "P4ssw0rd*01" });

            return users;
        }


        // GET: UsersController
        public ActionResult Index()
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
                int newId = usersList.Count + 1;
                user.Id = newId;

                usersList.Add(user);

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: UsersController/Login
        public IActionResult Login()
        {
            return View();
        }

        // POST: UsersController/Login
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Login(User user)
        {
            var existingUser = usersList.Find(u => u.UserEmail == user.UserEmail && u.Password == user.Password);

            if (existingUser != null)
            {
                // Usuario autenticado, redirigir a la página de inicio
                return RedirectToAction("Index", "Home");
            }
            else
            {
                // Usuario no encontrado o contraseña incorrecta, mostrar mensaje de error
                TempData["ErrorMessage"] = "Email or password is incorrect";
                return View();
            }
        }


        // GET: UsersController/Register
        public IActionResult Register()
        {
            User userModel = new User(); // o carga los datos del usuario
            return View(userModel);
        }

        // POST: UsersController/Register
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Register(User user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (user.Password == user.ConfirmPassword)
                    {
                        int newId = usersList.Count + 1;
                        user.Id = newId;

                        usersList.Add(user);

                        return RedirectToAction(nameof(Login));
                    }
                    else
                    {
                        ModelState.AddModelError("ConfirmPassword", "Passwords do not match.");
                    }
                }
                return View();
            }
            catch
            {
                return View();
            }
        }


    }
}