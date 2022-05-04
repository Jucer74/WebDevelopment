using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReminderApp.Entities;
using System.Linq;

namespace ReminderApp.Controllers
{
    public class ReminderController : Controller
    {
        private readonly AppDBContext _DBContext;
        public ReminderController(AppDBContext dBContext)
        {
            _DBContext = dBContext;
        }
        // GET: ReminderController
        public ActionResult Index()
        {
            var Reminders = from a in _DBContext.Reminders
                             orderby a.Id
                             select a;
            return View(Reminders);
        }

        // GET: ReminderController/Details/5
        public ActionResult Details(int id)
        {
            Reminder rem = _DBContext.Reminders.Find(id);
            return View(rem);
        }

        // GET: ReminderController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ReminderController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Reminder rem)
        {
            try
            {
                _DBContext.Reminders.Add(rem);
                _DBContext.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ReminderController/Edit/5
        public ActionResult Edit(int id)
        {
            Reminder rem = _DBContext.Reminders.Find(id);
            return View(rem);
        }

        // POST: ReminderController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Reminder rem)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _DBContext.Entry(rem).State = EntityState.Modified;
                    _DBContext.SaveChanges();
                    return RedirectToAction("Index");
                }
                return View(rem);
            }
            catch
            {
                return View();
            }
        }

        // GET: ReminderController/Delete/5
        public ActionResult Delete(int id)
        {
            Reminder rem = _DBContext.Reminders.Find(id);
            return View(rem);
        }

        // POST: ReminderController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(Reminder rem)
        {
            try
            {
                _DBContext.Entry(rem).State = EntityState.Deleted;
                _DBContext.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
