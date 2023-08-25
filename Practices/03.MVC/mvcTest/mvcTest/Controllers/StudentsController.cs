using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using mvcTest.Models;
using System.Collections.Generic;

namespace mvcTest.Controllers
{
    public class StudentsController : Controller
    {
        public static List <Student> studentsList = loadStudents();
        
        public static List<Student> loadStudents()
        {
            var students = new List<Student>();
            students.Add(new Student() {StudentId = 1, StudentName = "Carlos Serrato", StudentAge = 19, StudentEmail= "email@gmail.com", StudentGender = 'M'});
            students.Add(new Student() {StudentId = 2, StudentName = "Andrés Echeverry", StudentAge = 18, StudentEmail = "email@gmail.com", StudentGender = 'M' });
            students.Add(new Student() {StudentId = 3, StudentName = "Julio Robles", StudentAge = 20, StudentEmail = "email@gmail.com", StudentGender = 'M' });
            students.Add(new Student() {StudentId = 4, StudentName = "Isabella Reina", StudentAge = 17, StudentEmail = "email@gmail.com", StudentGender = 'M' });
            return students;
        }

        // GET: StudentsController
        public ActionResult Index()
        {
            return View(studentsList);
        }

        // GET: StudentsController/Details/5
        public ActionResult Details(int id)
        {
            var student = studentsList.Find(student => student.StudentId == id); ;
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
            var student = studentsList.Find(student => student.StudentId == id); ;
            return View(student);
        }

        // POST: StudentsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Student student)
        {
            try
            {
                var StudentToEdit = studentsList.FirstOrDefault(student => student.StudentId == id);
                if (StudentToEdit != null)
                {
                    var index = studentsList.IndexOf(StudentToEdit);
                    studentsList[index] = student;
                }
                
                
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
            var student = studentsList.Find(student => student.StudentId == id);
            return View(student);
        }

        // POST: StudentsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, Student student)
        {
            try
            {

                var ItemToRemove = studentsList.FirstOrDefault(student => student.StudentId == id);

                if (ItemToRemove != null)
                {
                    studentsList.Remove(ItemToRemove);
                }
                
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
