using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BDayReminderMVC.Models;
using Microsoft.Extensions.Primitives;

namespace BDayReminderMVC.Controllers
{
    public class UsersController : Controller
    {

        private static List<User> userlist = LoadUser();
       
        // GET: UsersController
       /* public ActionResult Index()
        {
            return View();
        }

        // GET: UsersController/Details/5
        public ActionResult Details(int id)
        {
            var user = userlist.Find(user => user.Id == id);
            return View(user);
        }*/

        // GET: UsersController/Create
        public ActionResult Create()
        {
            return View();
        }

        public System.Security.Claims.ClaimsPrincipal GetUser()
        {
            return User;
        }

        // POST: UsersController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(User user)
        {
            try
            {
                userlist.Add(user);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    
        // GET: UsersController/Edit/5
        /*public ActionResult Edit(int id)
        {
            var user = userlist.Find(user => user.Id == id);
            return View(user);
        }

        // POST: UsersController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, User user)
        {
            try
            {
                var editUsers = userlist.FirstOrDefault(user => user.Id == id);
                if (editUsers != null)
                {
                    var index = userlist.IndexOf(editUsers);
                    userlist[index] = user;
                }
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
            var user = userlist.Find(user => user.Id == id);
            return View();
        }

        // POST: UsersController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                var Remove = userlist.FirstOrDefault(user => user.Id == id);

                if (Remove != null)
                {
                    userlist.Remove(Remove);
                }
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }*/

        public ActionResult validationUser(string User, string Password)
        {
            


            return View();
        }

        private static List<User> LoadUser()
        {
            var user = new List<User>();

            user.Add(new Models.User()
            {
                UserName = "Admin@email.com",
                FirstName = "Admin",
                LastName = "User",
                Password = " P4ssw0rd*01"

            });

            return user;
        }
    }
}
