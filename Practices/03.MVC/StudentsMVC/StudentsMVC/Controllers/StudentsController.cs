﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentsMVC.Models;
using System.Collections.Generic;

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
            var student = studentsList.FirstOrDefault(x=> x.Id ==id); 
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
            var student = studentsList.FirstOrDefault(x => x.Id == id);
            return View(student);
        }

        // POST: StudentsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Student student)
        {
            try
            {
                var elementIndex = studentsList.FindIndex(i => i.Id == id);
                studentsList[elementIndex] = student;
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
        public ActionResult Delete(int id, Student student)
        {
            try
            {

                var studentDelete = studentsList.FirstOrDefault(x => x.Id == student.Id);
                studentsList.Remove(studentDelete);
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

            students.Add(new Student() { Id= 1, FirstName="John", LastName="Doe", DateOfBirth=new DateTime(1974, 10, 8), Sex='M' });
            students.Add(new Student() { Id = 2, FirstName = "Eduardo", LastName = "Zuluaga", DateOfBirth = new DateTime(1998, 11, 9), Sex = 'M' });
            students.Add(new Student() { Id = 3, FirstName = "Alejandra", LastName = "Martinez", DateOfBirth = new DateTime(1990, 10, 7), Sex = 'F' });
            students.Add(new Student() { Id = 4, FirstName = "Mariana", LastName = "Escobar", DateOfBirth = new DateTime(2000, 12, 5), Sex = 'F' });





            return students;
        }


    }
}