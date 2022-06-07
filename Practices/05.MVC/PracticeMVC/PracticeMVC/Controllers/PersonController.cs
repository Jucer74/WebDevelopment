﻿using Microsoft.AspNetCore.Http;
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
<<<<<<< HEAD
         // Mock User List
         if (personList is null)
         {
            personList = new List<PersonModel>()
            {
               new PersonModel{Id=1, FirstName="Julio", LastName="Robles", DateOfBirth= DateTime.Parse("10/08/1974"), Sex='M'},
               new PersonModel{Id=1, FirstName="Juan", LastName="Robles", DateOfBirth=DateTime.Parse("07/11/1996"), Sex='M'},
               new PersonModel{Id=1, FirstName="Pilar", LastName="Lopez", DateOfBirth=DateTime.Parse("04/10/1976"), Sex='F'}
            };
         }
=======
         _personService = personService;
>>>>>>> main
      }

      // GET: PersonController
      public ActionResult Index()
      {
         return View(_personService.GetAll());
      }

      // GET: PersonController/Details/5
      public ActionResult Details(int id)
      {
         return View(_personService.GetById(id));
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