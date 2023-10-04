using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MoneyBankMVC.Controllers
{
    public class AccoutsControllercs : Controller
    {
        // GET: AccoutsControllercs
        public ActionResult Index()
        {
            return View();
        }

        // GET: AccoutsControllercs/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: AccoutsControllercs/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: AccoutsControllercs/Create
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

        // GET: AccoutsControllercs/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: AccoutsControllercs/Edit/5
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

        // GET: AccoutsControllercs/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: AccoutsControllercs/Delete/5
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
