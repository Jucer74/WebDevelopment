using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebDev.Application.Models;

namespace WebDev.Application.Controllers
{
    public class UsersController : Controller
    {
        private static List<User> _userList = new List<User>
        {
            new User { Id = 1, Email = "Julio.Robles@email.com", Name = "Julio Robles", Username = "jrobles", Password = "Password" },
            new User { Id = 2, Email = "Pilar.Lopez@email.com", Name = "Pilar Lopez", Username = "plopez", Password = "Password" },
            new User { Id = 3, Email = "Felipe.Daza@email.com", Name = "Felipe Daza", Username = "fdaza", Password = "Password" }
        };

        // GET: UsersController
        public ActionResult Index()
        {
            return View(_userList);
        }

        // GET: UsersController/Details/5
        [HttpGet]
        public ActionResult Details(int id)
        {
            var userFound = _userList.FirstOrDefault(u => u.Id == id);

            if (userFound == null)
            {
                return NotFound();
            }

            return View(userFound);
        }

        // GET: UsersController/Create
        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        // POST: UsersController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(User user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    user.Id = _userList.Count + 1;
                    _userList.Add(user);
                    TempData["SuccessMessage"] = "User created successfully.";
                    return RedirectToAction(nameof(Index));
                }
            }
            catch (Exception ex)
            {
                TempData["ErrorMessage"] = "Error creating user: " + ex.Message;
            }
            return View(user);
        }

        // GET: UsersController/Edit/5
        [HttpGet]
        public ActionResult Edit(int id)
        {
            var userFound = _userList.FirstOrDefault(u => u.Id == id);

            if (userFound == null)
            {
                return NotFound();
            }

            return View(userFound);
        }

        // POST: UsersController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(User user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var userFound = _userList.FirstOrDefault(u => u.Id == user.Id);
                    if (userFound != null)
                    {
                        userFound.Email = user.Email;
                        userFound.Name = user.Name;
                        userFound.Username = user.Username;
                        userFound.Password = user.Password;
                        TempData["SuccessMessage"] = "User updated successfully.";
                        return RedirectToAction(nameof(Index));
                    }
                }
            }
            catch (Exception ex)
            {
                TempData["ErrorMessage"] = "Error updating user: " + ex.Message;
            }
            return View(user);
        }

        // GET: UsersController/Delete/5
        [HttpGet]
        public ActionResult Delete(int id)
        {
            var userFound = _userList.FirstOrDefault(u => u.Id == id);

            if (userFound == null)
            {
                return NotFound();
            }

            return View(userFound);
        }

       /* // POST: UsersController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id)
        {
            try
            {
                var userToDelete = _userList.FirstOrDefault(u => u.Id == id);
                if (userToDelete != null)
                {
                    _userList.Remove(userToDelete);
                    TempData["SuccessMessage"] = "User deleted successfully.";
                }
            }
            catch (Exception ex)
            {
                TempData["ErrorMessage"] = "Error deleting user: " + ex.Message;
            }
            return RedirectToAction(nameof(Index));
        }*/
    }
}
