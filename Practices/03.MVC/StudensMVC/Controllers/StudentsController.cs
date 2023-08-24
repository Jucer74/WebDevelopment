using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudensMVC.Models;

namespace StudensMVC.Controllers
{
    public class StudentsController : Controller
    {
        private static List<Student> studentsList = LoadStudents();



        // GET: StudentsController
        public ActionResult Index()
        {
            return View(studentsList);
        }

        // GET: StudentsController/Details/5
        public ActionResult Details(int id)
        {
            var student = studentsList.FirstOrDefault(x => x.Id == id);
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
            var student = studentsList.FirstOrDefault(x => x.Id == id);
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
            var student = studentsList.FirstOrDefault(x => x.Id == id);
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

        private static  List<Student> LoadStudents()
        {
            var students = new List<Student>();

            students.Add(new Student() {
                Id=1, 
                firstName="Carlos", 
                lastName="Careverga",
                DateOfBirth=new DateTime(2004,06,15), 
                Sex='M'
            });

            students.Add(new Student()
            {
                Id = 2,
                firstName = "Pedro",
                lastName = "Careverga",
                DateOfBirth = new DateTime(2004, 04, 15),
                Sex = 'M'
            });

            students.Add(new Student()
            {
                Id = 3,
                firstName = "Juan",
                lastName = "Careverga",
                DateOfBirth = new DateTime(2004, 02, 15),
                Sex = 'M'
            });

            students.Add(new Student()
            {
                Id = 4,
                firstName = "Camila",
                lastName = "Careverga",
                DateOfBirth = new DateTime(2004, 01, 15),
                Sex = 'F'
            });

            return students;
        }



    }
}
