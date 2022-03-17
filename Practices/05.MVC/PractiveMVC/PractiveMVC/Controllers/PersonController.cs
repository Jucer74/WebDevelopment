using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace PractiveMVC.Controllers
{
   public class PersonController : Controller
   {
      // GET: PersonController
      public ActionResult Index()
      {
         return View();
      }

      // GET: PersonController/Details/5
      public ActionResult Details(int id)
      {
         Models.Person person = new Models.Person()
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
