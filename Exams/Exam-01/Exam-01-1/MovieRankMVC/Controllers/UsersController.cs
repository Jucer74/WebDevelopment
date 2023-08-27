using Microsoft.AspNetCore.Mvc;
using MovieRankMVC.Models;
using Microsoft.AspNetCore.Http;

namespace MovieRankMVC.Controllers
{
    public class UsersController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(User user)
        {
            var registeredUserEmail = TempData["RegisteredUserEmail"] as string;
            var registeredPassword = TempData["RegisteredPassword"] as string;

            if (user.UserEmail == registeredUserEmail && user.Password == registeredPassword)
            {
                TempData["AuthenticatedUser"] = user.UserEmail;
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

                // Almacenar los datos registrados en TempData
                TempData["RegisteredUserEmail"] = user.UserEmail;
                TempData["RegisteredPassword"] = user.Password;

                return RedirectToAction(nameof(Login));
            }
            return View(user);
        }
    }
}
