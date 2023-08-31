using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentsMVC.Models;

namespace StudentsMVC.Controllers
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
            var student = studentsList.FirstOrDefault(x=> x.Id == id);
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
            try
            {
                var idNew = studentsList.Count + 1;
                student.Id = idNew;

                studentsList.Add(student);
                
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
        public ActionResult Edit(Student student)
        {
            try
            {
                var studentExist = studentsList.FirstOrDefault(x => x.Id == student.Id);

                studentExist.FirstName = student.FirstName;
                studentExist.LastName = student.LastName;
                studentExist.DateOfBirth = student.DateOfBirth;
                studentExist.Sex = student.Sex;

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
                var studentDelete = studentsList.FirstOrDefault(x => x.Id == id);
                studentsList.Remove(studentDelete);

                for (int i = 0; i<studentsList.Count; i++)
                {
                    studentsList[i].Id = i+1;
                }

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

            students.Add(new Student() { Id = 1, FirstName = "John", LastName = "Doe", DateOfBirth = new DateTime(1974,10,8), Sex='M'});
            students.Add(new Student() { Id = 2, FirstName = "Pedro", LastName = "Perez", DateOfBirth = new DateTime(1990, 1, 18), Sex = 'M' });
            students.Add(new Student() { Id = 3, FirstName = "Juan", LastName = "Martinez", DateOfBirth = new DateTime(2001, 3, 5), Sex = 'M' });
            students.Add(new Student() { Id = 4, FirstName = "Camila", LastName = "Lopez", DateOfBirth = new DateTime(2010, 8, 8), Sex = 'F' });

            return students;
        }

    }
}
