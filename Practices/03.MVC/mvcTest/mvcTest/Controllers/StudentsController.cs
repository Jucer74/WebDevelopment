using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using mvcTest.Models;
using mvcTest.Services;

namespace mvcTest.Controllers
{
    public class StudentsController : Controller
    {
        private readonly ICrudService _crudService;

        public StudentsController(ICrudService crudService)
        {
            _crudService = crudService;
        }

        // GET: Students
        public IActionResult Index()
        {
            var studentsList = _crudService.GetAll();
            return View(studentsList);
        }

        // GET: Students/Details/5
        public IActionResult Details(int id)
        {
            var StudentToDetails = _crudService.GetById(id);
            return View(StudentToDetails);
        }

        // GET: Students/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Students/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Student student)
        {
            _crudService.Create(student);
            return RedirectToAction(nameof(Index));
   

        }

        // GET: Students1/Edit/5
        public IActionResult Edit(int id)
        {
            var StudentToEdit = _crudService.GetById(id);
            return View(StudentToEdit);
        }

        // POST: Students/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Student student)
        {
            _crudService.Update(id, student);
            return RedirectToAction(nameof(Index));

        }

        // GET: Students/Delete/5
        public ActionResult Delete(int id)
        {
            var studentToDelete = _crudService.GetById(id);
            return View(studentToDelete);
        }

        // POST: Students/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            _crudService.Delete(id);
            return RedirectToAction(nameof(Index));
        }
    }
}
