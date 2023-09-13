using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using StudentsMVC.Models;
using StudentsMVC.Services;

namespace StudentsMVC.Controllers
{
    public class StudentsController : Controller
    {

        private readonly IStudentService _studentService;
        public StudentsController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        // GET: StudentsController
        public ActionResult Index()
        {
            var studentsList = _studentService.GetAll();
            return View(studentsList);
        }

        // GET: StudentsController/Details/5
        public ActionResult Details(int id)
        {
            //var student = studentsList.FirstOrDefault(x => x.Id == id);
            //return View(student);
            var student = _studentService.GetById(id);
            return View(student);
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
            try            {
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
            //var student = studentsList.FirstOrDefault(x => x.Id == id); 

            //return View(student);
            return View();
        }

        // POST: StudentsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Student student)
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
            //var student = studentsList.FirstOrDefault(x => x.Id == id);

            //return View(student);
            return View();
        }

        // POST: StudentsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, Student student)
        {
            try
            {
                _studentService.DeleteById(id);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        
    }
}