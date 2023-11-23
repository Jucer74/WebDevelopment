using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebDev.Application.Models;
using WebDev.Application.Config;

namespace WebDev.Application.Controllers
{

    public class UsersController : Controller
    {
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

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                  name: "default",
                  pattern: "{controller=Home}/{action=Index}/{id?}");
                // Users
                endpoints.MapControllerRoute(
                  name: "Users",
                  pattern: "{controller=Users}/{action=Index}/{id?}");
            });
        }
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
    }
}
