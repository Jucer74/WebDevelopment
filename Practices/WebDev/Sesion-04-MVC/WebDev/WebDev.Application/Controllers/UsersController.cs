using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using WebDev.Application.Config;
using WebDev.Application.Models;
using WebDev.Services;
using WebDev.Services.Entities;

namespace WebDev.Application.Controllers
{
    public class UsersController : Controller
    {
        private static List<User>? _userList;
        private static int numUsers;
        private UsersService usersService;

        private readonly ApiConfiguration _apiConfiguration;

        public UsersController(IOptions<ApiConfiguration> apiConfiguration)
        {
            _apiConfiguration = apiConfiguration.Value;
            usersService = new UsersService(_apiConfiguration.ApiUsersUrl);
        }

        [HttpGet]
        public ActionResult Index()
        {
            // Implementa lógica para obtener la lista de usuarios desde el servicio
            // usersService.GetUsersAsync();
            // Luego asigna la lista de usuarios a _userList
            // _userList = listaDeUsuariosObtenida;

            if (_userList is null)
            {
                _userList = new List<User>()
                {
                    new User{Id=1, Email="Julio.Robles@email.com", Name="Julio Robles", Username="jrobles", Password="Password"},
                    new User{Id=2, Email="Pilar.Lopez@email.com", Name="Pilar Lopez", Username="plopez", Password="Password"},
                    new User{Id=3, Email="Felipe.Daza@email.com", Name="Felipe Daza", Username="fdaza", Password="Password"}
                };
                numUsers = _userList.Count;
            }

            return View(_userList);
        }

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

        public ActionResult Create()
        {
            return View();
        }

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
