using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentsMVC.Models;

namespace StudentsMVC.Controllers
{
    public class StudentsController : Controller
    {
        // Global Varaibles
        private static List<Student> studentsList = LoadStudents(); 

        // GET: StudentsController
        public ActionResult Index()
        {
            return View(studentsList);
        }

        // GET: StudentsController/Details/5
        public ActionResult Details(int id)

        {   var student = studentsList.FirstOrDefault(x => x.Id == id);
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
            var student = studentsList.FirstOrDefault(x => x.Id == id);
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
            var student = studentsList.FirstOrDefault(x => x.Id == id);
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

            students.Add(new Student() { Id = 1, FirstName = "John", LastName = "Martinez", DateOfBirth = new DateTime(1998, 9, 10), Sex = 'M' });
            students.Add(new Student() { Id = 1, FirstName = "Luis", LastName = "Diaz", DateOfBirth = new DateTime(1998, 8, 10), Sex = 'M' });
            students.Add(new Student() { Id = 1, FirstName = "Juan", LastName = "Gonzales", DateOfBirth = new DateTime(1998, 7, 10), Sex = 'M' });
            students.Add(new Student() { Id = 1, FirstName = "pablo", LastName = "Nazario", DateOfBirth = new DateTime(1998, 6, 10), Sex = 'M' });

            return students;
        }

        #endregion Private-Methods

    }
}
