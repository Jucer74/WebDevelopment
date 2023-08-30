using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieRank.Models;
using NuGet.Protocol;

namespace MovieRank.Controllers
{
    public class UserController : Controller
    {
        // Create a list of users
        private static List<User> _users = LoadUsers();

        // LoadUsers method
        private static List<User> LoadUsers()
        {
            // Create a list of users
            List<User> users = new List<User>();

            // Add users to the list
            users.Add(new User
            {
                Id = 1, UserEmail = "jonhdoe@gmail.com", FirstName = "John", LastName = "Doe", Password = "password"
            });
            users.Add(new User
            {
                Id = 2, UserEmail = "jonhdoe2@gmail.com", FirstName = "John", LastName = "Doe", Password = "password"
            });
            users.Add(new User
            {
                Id = 3, UserEmail = "doejohn@gmail.com", FirstName = "John", LastName = "Doe", Password = "password"
            });
            users.Add(new User
            {
                Id = 4, UserEmail = "johndoe@gmail.com", FirstName = "John", LastName = "Doe", Password = "password"
            });
            users.Add(new User
            {
                Id = 5, UserEmail = "john_doe@yahoo.com", FirstName = "John", LastName = "Doe", Password = "password"
            });
            users.Add(new User
            {
                Id = 6, UserEmail = "admin@email.com", FirstName = "admin", LastName = "ctrl", Password = "P4ssw0rd*01"
            });
            return users;
        }

        // GET: User
        public ActionResult Index()
        {
            return View();
        }

        // GET: User/Create

        public ActionResult Create()
        {
            return PartialView("Create");
        }

        // POST: User/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(User user) // (IFormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here
                if (ModelState.IsValid)
                {
                    user.Id = _users.Max(u => u.Id) + 1;
                    _users.Add(user);
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
            User user = _users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);  //PartialView("Edit");
        }

        // POST: User/Edit/
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, User editingUser)//IFormCollection collection)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    User user = _users.FirstOrDefault(u => u.Id == id);
                    if (user == null)
                        return NotFound();
                    
                    // vamos a pasarle las propiedades que encuentra
                    user.UserEmail = editingUser.UserEmail;
                    user.FirstName = editingUser.FirstName;
                    user.LastName = editingUser.LastName;
                    user.Password = editingUser.Password;

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
            User currentUser = _users.FirstOrDefault(u => u.Id == id);
            // return PartialView("Details");
            return View(currentUser);
        }

        // GET: User/Delete/
        public ActionResult Delete(int id)
        {
            User user = _users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
            //return PartialView("Delete");
        }

        // POST: User/Delete/
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here
                _users.Remove(_users.FirstOrDefault(u => u.Id == id));

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return PartialView("Delete");
            }
        }

        // GET: User/List/
        public ActionResult List(int id)
        {
            return PartialView("List", _users);
        }


        //Get: User/Register
        // public ActionResult Register()
        // {
        //     return PartialView("Register");
        // }

        // POST: User/Register
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        // public ActionResult Register(User user)
        // {
        //     if (ModelState.IsValid)
        //     {
        //         _users.Add(user);
        //         return RedirectToAction("RegisterSuccess");
        //     }
        //  
        //     return PartialView("Register", user);
        // }

        
        // User/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginViewModel model) //(User user)
        {
            if (ModelState.IsValid)
            {
                var usuarioValido = _users.FirstOrDefault(u =>
                    u.UserEmail.Equals(model.UserEmail, StringComparison.OrdinalIgnoreCase) &&
                    u.Password == model.Password);
                if (usuarioValido != null)
                {
                    Console.Out.WriteLine($"Sesion iniciada: {usuarioValido.ToJson()}");
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    
                    ModelState.AddModelError("", "Email or password are wrong. Check again");
                }
            }
            return PartialView("Login", model);
            }
            // var user = _users.FirstOrDefault(u => u.UserEmail == email && u.Password == password);

            // if (user != null)
            // {
            //     return RedirectToAction("Index", "Home");
            //     // if login successful
            // }
            // else
            // {
            //     // not successful: por que? algun error en los datos
            //     ModelState.AddModelError("", "Correo o contraseña incorrecta.");
            //     return PartialView("_LoginPartial", user);
            // }
        //}

        // [HttpPost]
        // public async Task<IActionResult> Login(User model)
        // {
        //     
        // }



    //public IActionResult Login()
    //    {
    //        return View();
    //    }
    }
}