using Microsoft.AspNetCore.Mvc;
using MovieRankMVC.Services;
using MovieRankMVC.Models;

namespace MovieRankMVC.Controllers
{
    public class UserController : Controller
    {
        //private static UserService _userService;
        private static List<User> userList = LoadUsers();


        private static List<User> LoadUsers()
        {
            List<User> users = new()
            {
                new User() {Id = 1, UserEmail = "correouser@gmail.com", FirstName = "User", LastName = "1", Password = "12345678"}
            };

            return users;
        }

        public ActionResult Index()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Login(User user)
        {
            var existingUser = userList.Find(u => u.UserEmail == user.UserEmail && u.Password == user.Password);
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
            User userModel = new();
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
                    var userExist = userList.FirstOrDefault(u => u.UserEmail == user.UserEmail);
                    if (userExist != null)
                    {
                        ModelState.AddModelError("UserEmail", "A user is already exist.");
                        return View();
                    }

                    if (user.Password == user.ConfirmPassword)
                    {
                        int newId = userList.Count + 1;
                        user.Id = newId;

                        userList.Add(user);

                        return RedirectToAction(nameof(Login));

                    }

                    else
                    {
                        ModelState.AddModelError("ConfirmPassword", "The password don't match.");
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
