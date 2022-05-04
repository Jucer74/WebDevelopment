using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReminderApp.Entities;
using System.Linq;
using System.Net;

namespace ReminderApp.Controllers
{
    public class CategoryController : Controller
    {
        private readonly AppDBContext _DBContext;
        public CategoryController(AppDBContext dBContext)
        {
            _DBContext = dBContext;
        }
        // GET: CategoryController
        public ActionResult Index()
        {
            var Categories = from a in _DBContext.Categories
                             orderby a.Id
                             select a;
            return View(Categories);
        }


        public ActionResult GetAll (int id) 
        {
            var Reminders = from a in _DBContext.Reminders
                            where a.CategoryId == id
                            select a;
            return View(Reminders);
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
                _DBContext.Categories.Add(cat);
                _DBContext.SaveChanges();
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
            Category cat = _DBContext.Categories.Find(id);
            return View(cat);
        }

        // POST: CategoryController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Category cat)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _DBContext.Entry(cat).State = EntityState.Modified;
                    _DBContext.SaveChanges();
                    return RedirectToAction("Index");
                }
                return View(cat);
            }
            catch
            {
                return View();
            }
        }

        // GET: CategoryController/Delete/5
        public ActionResult Delete(int id)
        {
            Category cat = _DBContext.Categories.Find(id);
            return View(cat);
        }

        // POST: CategoryController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(Category cat)
        {
            try
            {
                _DBContext.Entry(cat).State = EntityState.Deleted;
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
