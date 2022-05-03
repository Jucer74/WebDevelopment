using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReminderApp.Entities;
using System.Linq;

namespace ReminderApp.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ReminderDBContext _reminderDBContext;
        public CategoryController(ReminderDBContext reminderDBContext)
        {
            _reminderDBContext = reminderDBContext;
        }
        // GET: CategoryController
        public ActionResult Index()
        {
            var Categories = from a in _reminderDBContext.Categories
                             orderby a.Id
                             select a;
            return View(Categories);
        }

        // GET: CategoryController/Details/5
        public ActionResult Details(int id)
        {
            Category cat = _reminderDBContext.Categories.Find(id);
            return View(cat);
        }

        // GET: CategoryController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: CategoryController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Category cat)
        {
            try
            {
                _reminderDBContext.Categories.Add(cat);
                _reminderDBContext.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: CategoryController/Edit/5
        public ActionResult Edit(int id)
        {
            Category cat = _reminderDBContext.Categories.Find(id);
            return View(cat);
        }

        // POST: CategoryController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Category cat)
        {
            try
            {
                _reminderDBContext.Entry(cat).State = EntityState.Modified;
                _reminderDBContext.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: CategoryController/Delete/5
        public ActionResult Delete(int id)
        {
            Category cat = _reminderDBContext.Categories.Find(id);
            return View(cat);
        }

        // POST: CategoryController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(Category cat)
        {
            try
            {
                _reminderDBContext.Entry(cat).State = EntityState.Deleted;
                _reminderDBContext.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
