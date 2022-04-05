using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PracticeMVC.Models;
using System;
using System.Collections.Generic;

namespace PracticeMVC.Controllers
{
    public class PersonController : Controller
    {
        private static List<PersonModel> personList;

        public PersonController()
        {
            // Mock User List
            if (personList is null)
            {
                personList = new List<PersonModel>()
            {
               new PersonModel{Id=1, FirstName="Julio", LastName="Robles", DateOfBirth= DateTime.Parse("1974/10/08"), Sex='M'},
               new PersonModel{Id=1, FirstName="Juan", LastName="Robles", DateOfBirth= DateTime.Parse("1996/07/27"), Sex='M'},
               new PersonModel{Id=1, FirstName="Pilar", LastName="Lopez", DateOfBirth= DateTime.Parse("1976/10/04"), Sex='F'}
            };
            }
        }

        // GET: PersonController
        public ActionResult Index()
        {
            return View(personList);
        }

        // GET: PersonController/Details/5
        public ActionResult Details(int id)
        {
            PersonModel person = new PersonModel()
            {
                Id = 1,
                FirstName = "John",
                LastName = "Doe",
                DateOfBirth = DateTime.Parse("1974/10/08"),
                Sex = 'M'
            };

            return View(person);
        }

        // GET: PersonController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PersonController/Create
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

        // GET: PersonController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: PersonController/Edit/5
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

        // GET: PersonController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: PersonController/Delete/5
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
    }
}