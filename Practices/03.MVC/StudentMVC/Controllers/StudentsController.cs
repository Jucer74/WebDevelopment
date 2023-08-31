using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentMVC.Models;

namespace StudentMVC.Controllers
{
    public class StudentsController : Controller

    {

        private List<Student> studentsList = LoadStudent();


        // GET: StudentsController
        public ActionResult Index()
        {
            return View(studentsList);
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

        private static List<Students> LoadStudent()
        {
            var students = new List<Students>();

            students.Add(new Students() { Id = 1, FirstName ="John", LastName="Doe", DateOfBirth=new DateTime(1974,10,8), Sex="M" });
            students.Add(new Students() { Id = 2, FirstName = "John", LastName = "Doe", DateOfBirth = new DateTime(1974, 10, 8), Sex = "M" });

            students.Add(new Students() { Id = 3, FirstName = "John", LastName = "Doe", DateOfBirth = new DateTime(1974, 10, 8), Sex = "M" });

            students.Add(new Students() { Id = 4, FirstName = "John", LastName = "Doe", DateOfBirth = new DateTime(1974, 10, 8), Sex = "M" });

            students.Add(new Students() { Id = 5, FirstName = "John", LastName = "Doe", DateOfBirth = new DateTime(1974, 10, 8), Sex = "m" });

            return students;
        }

    }
}
