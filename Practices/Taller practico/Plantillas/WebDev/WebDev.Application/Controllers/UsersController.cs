using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebDev.Application.Models;
using WebDev.Application.Config;
using WebDev.Services;
using Microsoft.Extensions.Options;


namespace WebDev.Application.Controllers
{
    public class UsersController : Controller
    {
        private readonly UsersService usersService;

        public UsersController(IOptions<ApiConfiguration> apiConfiguration)
        {
            var _apiConfiguration = apiConfiguration.Value;
            usersService = new UsersService(_apiConfiguration.ApiUsersUrl);
        }

        // GET: UsersController
        [HttpGet]
        public ActionResult Index()
        {
            // Set Object Model
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
                    user.Id = ++numUsers;
                    _userList.Add(user);
                }

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
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
                    userFound.Email = user.Email;
                    userFound.Name = user.Name;
                    userFound.Username = user.Username;
                    userFound.Password = user.Password;

                    return RedirectToAction(nameof(Index));
                }
                return View(user);
            }
            catch
            {
                return View();
            }
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

        // POST: UsersController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(User user)
        {
            try
            {
                var userFound = _userList.FirstOrDefault(u => u.Id == user.Id);

                if (userFound == null)
                {
                    return View();
                }

                _userList.Remove(userFound);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

    }
}
