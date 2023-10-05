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
            var StudentToDetails = _studentService.GetById(id);
            return View(StudentToDetails);
        }

        // GET: StudentsController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: StudentsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Student student)
        {
            try
            {
                _studentService.Create(student);
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
            var StudentToEdit = _studentService.GetById(id);
            return View(StudentToEdit);
        }

        // POST: StudentsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Student student)
        {
            try
            {
                _studentService.Update(id, student);
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
            var StudentToDelete = _studentService.GetById(id);
            return View(StudentToDelete);
        }

        // POST: StudentsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, Student student)
        {
            try
            {
                _studentService.Delete(id, student);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
