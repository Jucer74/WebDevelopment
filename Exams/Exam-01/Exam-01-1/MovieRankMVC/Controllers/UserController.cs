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
 
        // GET: UserController
        public ActionResult Index(User user)
        {
            return View();
        }

        // GET: UserController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: UserController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(User user)
        {
            try
            {
                int newId = userList.Count + 1;
                user.Id = newId;
                userList.Add(user);

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        public IActionResult Login(User user) 
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Login(User user)
        {
            var userExist = userList.Find(u => u.UserEmail == user.UserEmail && u.Password == user.Password);
            if (userExist != null)
            {
                return RedirectToAction("Index", "Home");
            }
            else
            {
                TempData["ErrorMessage"] = "Email or password is incorrect"
            }
        }
        public IActionResult Register()
        {
            return View();
        }
    }
}
