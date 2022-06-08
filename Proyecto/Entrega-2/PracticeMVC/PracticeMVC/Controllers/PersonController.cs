using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PracticeMVC.Models;
using PracticeMVC.Services;
using System;
using System.Collections.Generic;

namespace PracticeMVC.Controllers
{
    public class PersonController : Controller
    {
        private readonly IPersonService _personService; 

        public PersonController(IPersonService personService)
        {
            _personService = personService;


            // Mock User List
            //if (personList is null)
            //{
            //    personList = new List<PersonModel>()
            //{
            //   new PersonModel{Id=1, FirstName="Julio", LastName="Robles", DateOfBirth= DateTime.Parse("1974/10/08"), Sex='M'},
            //   new PersonModel{Id=1, FirstName="Juan", LastName="Robles", DateOfBirth= DateTime.Parse("1996/07/27"), Sex='M'},
            //   new PersonModel{Id=1, FirstName="Pilar", LastName="Lopez", DateOfBirth= DateTime.Parse("1976/10/04"), Sex='F'}
            //};
            //}
        }

        // GET: PersonController
        public ActionResult Index()
        {
            return View(_personService.GetAll());
        }

        // GET: PersonController/Details/5
        public ActionResult Details(int id)
        {
            PersonModel person = _personService.GetById(id);


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
        public ActionResult Create(PersonModel person)
        {
            try
            {
                _personService.Add(person);
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
        public ActionResult Edit(PersonModel person)
        {
            try
            {
                _personService.Update(person);
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
            return View(_personService.GetById(id));
        }

        // POST: PersonController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                _personService.Delete(id);
                return RedirectToAction(nameof(Index));
            }
            catch
            {

                return View();
            }
        }
    }
}