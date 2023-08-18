
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentsMVC.Models;

namespace StudentsMVC.Controllers
{
    public class StudentsController : Controller
    {

        private static List<Student> studentsList= LoadStudents();


        // GET: StudentsController
        public ActionResult Index()
        {
            return View(studentsList);
        }

        // GET: StudentsController/Details/5
        public ActionResult Details(int id)
        {
            var student = studentsList.FirstOrDefault(x=> x.Id==id);
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
            var student = studentsList.FirstOrDefault(x => x.Id==id);
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
            var student = studentsList.FirstOrDefault(x => x.Id==id);
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

       private static List<Student> LoadStudents()
        {
            var students = new List<Student>();

            students.Add(new Student() { Id=1, FirstName="Juanita", LastName="Noya", DateofBirth= new DateTime(2002, 09, 27), Sex='F' });
            students.Add(new Student() { Id=2, FirstName="Mateo", LastName="Medina", DateofBirth= new DateTime(2003, 04, 22), Sex='M' });
            students.Add(new Student() { Id=3, FirstName="Judy", LastName="Giraldo", DateofBirth= new DateTime(1981, 06, 04), Sex='F' });
            students.Add(new Student() { Id=4, FirstName="Luis", LastName="Lopez", DateofBirth= new DateTime(1974, 09, 04), Sex='M' });

            return students;

        }




    }
}
