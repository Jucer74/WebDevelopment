using BDayReminderMVC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BDayReminderMVC.Controllers
{
    public class FriendsController : Controller
    {

        private static List<Friend> friendList = new List<Friend>();
        private static int contadorId = 1; // Contador para el Id automático

        // GET: FriendsController
        public ActionResult Index()
        {
            return View(friendList);
        }

        // GET: FriendsController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: FriendsController/Create
        public ActionResult Create()
        {
            return View();
        }

        // GET: FriendsController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: FriendsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
       public IActionResult Create(Friend friend)
        {

            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View(friend);
            }
        }


        // GET: FriendsController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: FriendsController/Delete/5
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
    }
}
