<<<<<<< HEAD
﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
=======
﻿using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
>>>>>>> origin/2023-02-1/julroburi
using StudentsMVC.Models;

namespace StudentsMVC.Controllers
{
    public class StudentsController : Controller
    {
<<<<<<< HEAD

=======
>>>>>>> origin/2023-02-1/julroburi
        // Global Variables
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
<<<<<<< HEAD
            return View();
=======

            return View(student);
>>>>>>> origin/2023-02-1/julroburi
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
<<<<<<< HEAD
            try
            {
=======
            try            {
>>>>>>> origin/2023-02-1/julroburi
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
<<<<<<< HEAD
            var student = studentsList.FirstOrDefault(x => x.Id == id);
            return View();
=======
            var student = studentsList.FirstOrDefault(x => x.Id == id); 

            return View(student);
>>>>>>> origin/2023-02-1/julroburi
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
<<<<<<< HEAD
            return View();
=======

            return View(student);
>>>>>>> origin/2023-02-1/julroburi
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
<<<<<<< HEAD
=======

>>>>>>> origin/2023-02-1/julroburi
        #region Private-Methods

        private static List<Student> LoadStudents()
        {
            List<Student> students = new List<Student>();

            students.Add(new Student() { Id = 1, FirstName = "John", LastName = "Doe", DateOfBirth = new DateTime(1980, 10, 10), Sex = 'M' });
            students.Add(new Student() { Id = 2, FirstName = "Barry", LastName = "Allen", DateOfBirth = new DateTime(2001, 7, 7), Sex = 'M' });
            students.Add(new Student() { Id = 3, FirstName = "Diana", LastName = "Prince", DateOfBirth = new DateTime(1950, 8, 8), Sex = 'F' });
<<<<<<< HEAD

=======
            
>>>>>>> origin/2023-02-1/julroburi
            return students;
        }

        #endregion Private-Methods
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/2023-02-1/julroburi
