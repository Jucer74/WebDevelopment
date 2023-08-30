using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieRank.Models;
using MovieRank.Services;

namespace MovieRank.Controllers
{
    public class UserController : Controller
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        // GET: User
        public ActionResult Index()
        {
            var users = _userService.GetAllUsers();
            return View(users);
        }

        // GET: User/Create
        public ActionResult Create()
        {
            return View("Create");
        }

        // POST: User/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(User user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _userService.AddUser(user);
                    return RedirectToAction(nameof(Index));
                }

                return View(user);
            }
            catch
            {
                return PartialView("Create");
            }
        }

        // GET: User/Edit/
        public ActionResult Edit(int id)
        {
            User user = _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // POST: User/Edit/
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, User editingUser)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _userService.UpdateUser(id, editingUser);
                    return RedirectToAction(nameof(Index));
                }

                return View(editingUser);
            }
            catch
            {
                return PartialView("Edit");
            }
        }

        // GET: User/Details/id
        public ActionResult Details(int id)
        {
            User user = _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // GET: User/Delete/
        public ActionResult Delete(int id)
        {
            User user = _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // POST: User/Delete/
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                _userService.DeleteUser(id);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return PartialView("Delete");
            }
        }

        // GET: User/List/
        public ActionResult List()
        {
            var users = _userService.GetAllUsers();
            return PartialView("List", users);
        }
    }
}
