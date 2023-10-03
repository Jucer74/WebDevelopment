using Microsoft.AspNetCore.Mvc;
using SchoolMVC.Models;
using SchoolMVC.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolMVC.Controllers
{
    public class StudentsController : Controller
    {
        private readonly StudentService _studentService;

        public StudentsController(StudentService studentService)
        {
            _studentService = studentService;
        }

        // GET: StudentsController
        public async Task<ActionResult> Index()
        {
            var studentList = await _studentService.GetAll();
            return View(studentList);
        }

        // GET: StudentsController/Details/5
        public async Task<ActionResult> Details(int id)
        {
            var studentFound = await _studentService.GetById(id);

            if (studentFound == null)
            {
                return NotFound();
            }

            return View(studentFound);
        }

        // GET: StudentsController/Create
        public ActionResult Create()
        {
            var student = new Student();
            student.DateOfBirth = DateTime.Today;
            student.Sex = 'M';
            return View(student);
        }

        // POST: StudentsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(Student student)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await _studentService.CreateStudent(student);
                    return RedirectToAction(nameof(Index));
                }

                return View(student);
            }
            catch
            {
                return View();
            }
        }

        // GET: StudentsController/Edit/5
        public async Task<ActionResult> Edit(int id)
        {
            var studentFound = await _studentService.GetById(id);

            if (studentFound == null)
            {
                return NotFound();
            }

            return View(studentFound);
        }

        // POST: StudentsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(Student student)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await _studentService.EditStudent(student.Id, student);
                    return RedirectToAction(nameof(Index));
                }

                return View(student);
            }
            catch
            {
                return View();
            }
        }

        // GET: StudentsController/Delete/5
        public async Task<ActionResult> Delete(int id)
        {
            var studentFound = await _studentService.GetById(id);

            if (studentFound == null)
            {
                return NotFound();
            }

            return View(studentFound);
        }

        // POST: StudentsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Delete(int id, Student student)
        {
            try
            {
                await _studentService.DeleteStudent(id);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
