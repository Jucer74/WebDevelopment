using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BDayReminderMVC.Models;
using Microsoft.Extensions.Primitives;
using System;
using System.Drawing.Printing;
using System.Reflection;
using Microsoft.Win32;

namespace BDayReminderMVC.Controllers
{
    public class UsersController : Controller
    {

        private static List<User> userlist = LoadUser();
       
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
                if (ModelState.IsValid)
                {
                    userlist.Add(user);
                    return RedirectToAction("Login");
                }
                else
                {
                    // Si el modelo no es válido, regresa a la vista de registro con los mensajes de error
                    return View(user);
                }

            }
            catch
            {
                return Content("ERROR");
            }
        }

        // GET: UsersController/Login
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]

        // POST: UsersController/Login
        public ActionResult Login(User CurrentUser)
        {
            var user = userlist.Find(User => User.UserName == CurrentUser.UserName);

            if (user != null && user.Password == CurrentUser.Password)
            {
                return RedirectToAction("Home", "Friends");
            }
            else
            {
                ModelState.AddModelError("", "Usuario o contraseña incorrectos");
                return View();
            }
        }

        private static List<User> LoadUser()
        {
            var user = new List<User>();

            user.Add(new Models.User()
            {
                UserName = "Admin@email.com",
                FirstName = "Admin",
                LastName = "User",
                Password = "P4ssw0rd*01"

            });

            return user;
        }
    }
}
