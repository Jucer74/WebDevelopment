using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BDayReminderMVC.Controllers
{
    public class FriendsController : Controller
    {
        // GET: FriendsController
        public ActionResult Index()
        {
            return View();
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

        // POST: FriendsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
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

        // GET: FriendsController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: FriendsController/Edit/5
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
