using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MvcRestAPI.Models;
using MvcRestAPI.Services;

namespace MvcRestAPI.Controllers
{
    public class StudentsController : Controller
    {
        private readonly IStudentService _studentService;
        public StudentsController(IStudentService StudentService) {
            _studentService = StudentService;
        }
        // GET: StudentsController
        public ActionResult Index()
        {
            var studentList = _studentService.GetAll();
            return View(studentList);
        }

        // GET: StudentsController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: StudentsController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: StudentsController/Create
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

        // GET: StudentsController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: StudentsController/Edit/5
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

        // GET: StudentsController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: StudentsController/Delete/5
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
