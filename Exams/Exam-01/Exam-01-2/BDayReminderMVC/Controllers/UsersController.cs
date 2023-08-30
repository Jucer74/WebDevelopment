using BDayReminderMVC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BDayReminderMVC.Models;
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

            users.Add(new User() { Id = 1, UserEmail = "Admin@email.com", FirstName = "Admin", LastName = "User", Password = "P4ssw0rd*01" });

            return users;
        }


 

        // GET: UsersController/Login
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Login(User user)
        {
            var existingUser = usersList.Find(u => u.UserEmail == user.UserEmail && u.Password == user.Password);
            Console.WriteLine(usersList);

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