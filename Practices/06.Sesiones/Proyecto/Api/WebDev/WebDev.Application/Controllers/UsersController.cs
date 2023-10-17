using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebDev.Application.Models;

namespace WebDev.Application.Controllers
{
    public class UsersController : Controller
    {
        private static List<User> _userList;
        private static int numUsers;

        public UsersController()
        {
            // Mock User List
            if (_userList is null)
            {
                _userList = new List<User>()
                {
                  new User{Id=1, Email="Julio.Robles@email.com", Name="Julio Robles", Username="jrobles", Password="Password"},
                  new User{Id=2, Email="Pilar.Lopez@email.com", Name="Pilar Lopez", Username="plopez", Password="Password"},
                  new User{Id=3, Email="Felipe.Daza@email.com", Name="Felipe Daza", Username="fdaza", Password="Password"},
                };

                numUsers = _userList.Count;
            }
        }

        // GET: UsersController
        [HttpGet]
        public ActionResult Index()
        {
            // Set Object Model
            return View(_userList);
        }

        // GET: UsersController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: UsersController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: UsersController/Create
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

        // GET: UsersController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: UsersController/Edit/5
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

        // GET: UsersController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: UsersController/Delete/5
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
