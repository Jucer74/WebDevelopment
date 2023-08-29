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
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Create()
        {
            return View();
        }
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

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Login(User user)
        {
            var existingUser = usersList.Find(u => u.UserEmail == user.UserEmail && u.Password == user.Password);
            if (existingUser != null)
            {
                return RedirectToAction("Index", "Home");
            }
            else
            {
                TempData["ErrorMessage"] = "Email or password is incorrect";
                return View();
            }
        }
        public IActionResult Register()
        {
            User userModel = new User();
            return View(userModel);
        }

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