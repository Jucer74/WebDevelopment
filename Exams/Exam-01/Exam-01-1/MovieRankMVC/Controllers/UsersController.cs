using Microsoft.AspNetCore.Mvc;
using MovieRankMVC.Models;
using System.Collections.Generic;

namespace MovieRankMVC.Controllers
{
    public class UsersController : Controller
    {
        // Lista estática para almacenar los datos de registro
        private static List<User> registeredUsers = new List<User>();

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(User user)
        {
            var registeredUser = registeredUsers.Find(u => u.UserEmail == user.UserEmail && u.Password == user.Password);

            if (registeredUser != null)
            {
                ViewBag.AuthenticatedUser = registeredUser.UserEmail;
                return RedirectToAction("Index", "Home");
            }
            else
            {
                ModelState.AddModelError("", "Credenciales inválidas");
            }

            return View(user);
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Register(User user)
        {
            if (ModelState.IsValid)
            {
                // Agregar el usuario a la lista estática
                registeredUsers.Add(user);

                return RedirectToAction(nameof(Login));
            }
            return View(user);
        }
    }
}