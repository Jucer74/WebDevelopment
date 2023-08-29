using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieRankMVC.Models;

namespace MovieRankMVC.Controllers
{
    public class UsersController : Controller
    {
        private static List<User> usersList = LoadUsers();

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Details(int id)
        {
            return View();
        }
        public ActionResult Create()
        {
            return View(new User()); 
        }

        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(User user)
        {
            try
            {
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
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ModelState.AddModelError("", "Invalid credentials, please try again");
                    return View("Login");
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "Login process failed: " + ex.Message);
                return View();
            }
        }

        public ActionResult Edit(int id)
        {
            return View();
        }

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

        public ActionResult Delete(int id)
        {
            return View();
        }

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
