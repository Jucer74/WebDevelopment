using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MVC_project_one.Models;

namespace MVC_project_one.Controllers
{
    public class StudentsController : Controller

      
    {

        //Global Variable
        private static List<Student> studentList = LoadStudent();

        //

        private static List<Student> LoadStudent()
        {
            List<Student> students = new List<Student>();

            students.Add(new Student() { Id=1, FirstName="Jhon", LastName="Fuentes", DateOfBirth = new DateTime(2002,4,25), Sex='M'});
            students.Add(new Student() { Id = 2, FirstName = "Jhon", LastName = "Fuentes", DateOfBirth = new DateTime(2002, 4, 25), Sex = 'M' });
            students.Add(new Student() { Id = 3, FirstName = "Jhon", LastName = "Fuentes", DateOfBirth = new DateTime(2002, 4, 25), Sex = 'M' });

            return students;
        }


        // GET: StudentsController
        public ActionResult Index()
        {
            return View(studentList);
        }

        // GET: StudentsController/Details/5
        public ActionResult Details(int id)
        {
            var student = studentList.FirstOrDefault(x => x.Id == id);
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
            var student = studentList.FirstOrDefault(x => x.Id == id);
            return View(student);
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
            var student = studentList.FirstOrDefault(x => x.Id == id);
            return View(student);
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
