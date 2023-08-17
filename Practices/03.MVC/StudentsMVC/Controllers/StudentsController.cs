using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentsMVC.Models;

namespace StudentsMVC.Controllers
{
    public class StudentsController : Controller
    {

        // Global variable
        private static List<Student> studentsList = LoadStudents();

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
        #region Private-Methods

        private static List<Student> LoadStudents()
        {
            List<Student> students = new List<Student>();

            students.Add(new Student() { Id = 1, FirstName = "John", LastName = "Doe", DateOfBirth = new DateTime(1980, 10, 10), Sex = 'M' });
            students.Add(new Student() { Id = 2, FirstName = "Barry", LastName = "Allen", DateOfBirth = new DateTime(2001, 7, 7), Sex = 'M' });
            students.Add(new Student() { Id = 3, FirstName = "Diana", LastName = "Prince", DateOfBirth = new DateTime(1950, 8, 8), Sex = 'F' });

            return students;
        }

        #endregion Private-Methods

    }

}
