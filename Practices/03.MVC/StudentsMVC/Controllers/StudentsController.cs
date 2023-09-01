<<<<<<< HEAD
﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentsMVC.Models;
using System.Data;
=======
﻿
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentsMVC.Models;
>>>>>>> 2023-02-2/luilopgir

namespace StudentsMVC.Controllers
{
    public class StudentsController : Controller
    {

        private static List<Student> studentsList= LoadStudents();

<<<<<<< HEAD
=======

>>>>>>> 2023-02-2/luilopgir
        // GET: StudentsController
        public ActionResult Index()
        {
            return View(studentsList);
        }

        // GET: StudentsController/Details/5
        public ActionResult Details(int id)
        {
<<<<<<< HEAD
            var student = studentsList.FirstOrDefault(x=> x.Id == id);
=======
            var student = studentsList.FirstOrDefault(x=> x.Id==id);
>>>>>>> 2023-02-2/luilopgir
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
<<<<<<< HEAD
            var student = studentsList.FirstOrDefault(x => x.Id == id);
=======
            var student = studentsList.FirstOrDefault(x => x.Id==id);
>>>>>>> 2023-02-2/luilopgir
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
<<<<<<< HEAD
            var student = studentsList.FirstOrDefault(x => x.Id == id);
=======
            var student = studentsList.FirstOrDefault(x => x.Id==id);
>>>>>>> 2023-02-2/luilopgir
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

<<<<<<< HEAD
        private static List<Student> LoadStudents()
        {
            var students = new List<Student>();

            students.Add(new Student() { Id=1, FirstName="John", LastName="Doe", DateOfBirth=new DateTime(1974, 10, 8), Sex='M'});
            students.Add(new Student() { Id = 2, FirstName = "Pedro", LastName = "Perez", DateOfBirth = new DateTime(1990, 1, 18), Sex = 'M' });
            students.Add(new Student() { Id = 3, FirstName = "Juan", LastName = "Martinez", DateOfBirth = new DateTime(2001, 3, 5), Sex = 'M' });
            students.Add(new Student() { Id = 4, FirstName = "Camila", LastName = "Lopez", DateOfBirth = new DateTime(2001, 9, 11), Sex = 'F' });

            return students;
        }

=======
       private static List<Student> LoadStudents()
        {
            var students = new List<Student>();

            students.Add(new Student() { Id=1, FirstName="Juanita", LastName="Noya", DateofBirth= new DateTime(2002, 09, 27), Sex='F' });
            students.Add(new Student() { Id=2, FirstName="Mateo", LastName="Medina", DateofBirth= new DateTime(2003, 04, 22), Sex='M' });
            students.Add(new Student() { Id=3, FirstName="Judy", LastName="Giraldo", DateofBirth= new DateTime(1981, 06, 04), Sex='F' });
            students.Add(new Student() { Id=4, FirstName="Luis", LastName="Lopez", DateofBirth= new DateTime(1974, 09, 04), Sex='M' });

            return students;

        }
>>>>>>> 2023-02-2/luilopgir




    }
}
