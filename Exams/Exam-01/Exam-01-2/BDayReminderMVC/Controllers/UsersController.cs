using BDayReminderMVC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BDayReminderMVC.Controllers
{
    public class UsersController : Controller
    {


        private static List<User> usersList = new List<User>();


        // GET: UsersController
        public ActionResult Index()
        {
            return View(usersList);
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
    }
}
