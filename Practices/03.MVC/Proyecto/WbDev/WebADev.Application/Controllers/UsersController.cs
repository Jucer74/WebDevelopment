using Microsoft.AspNetCore.Mvc;
using WebDev.Application.Models;
using WebDev.Services;
using Microsoft.Extensions.Options;
using WebDev.Services.Entities;
using WebADev.Application.Config;

namespace WebDev.Application.Controllers
{
    public class UsersController : Controller
    {
        private static List<User> _userList;
        private static int numUsers;
        private readonly ApiConfiguration _apiConfiguration;
        private UsersService usersService;

        public UsersController(IOptions<ApiConfiguration> apiConfiguration)
        {
            _apiConfiguration = apiConfiguration.Value;

            usersService = new UsersService(_apiConfiguration.ApiUsersUrl);
        }

        // GET: UsersController
        [HttpGet]
        public async Task<ActionResult> Index()
        {
            IList<UserDto> users = await usersService.GetUsers();

            _userList = users.Select(userDto => MapperToUser(userDto)).ToList();

            return View(_userList);
        }

        // GET: UsersController/Details/5
        [HttpGet]
        public async Task<ActionResult> Details(int id)
        {
            var userFound = await usersService.GetUserById(id);

            if (userFound == null)
            {
                return NotFound();
            }

            var user = MapperToUser(userFound);

            return View(user);
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
        public async Task<ActionResult> Create(User user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var userAdded = await usersService.AddUser(MapperToUserDto(user));
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
        public async Task<ActionResult> Edit(int id)
        {
            var userFound = await usersService.GetUserById(id);

            if (userFound == null)
            {
                return NotFound();
            }

            var user = MapperToUser(userFound);

            return View(user);
        }

        // POST: UsersController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(User user)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var userModified = await usersService.UpdateUser(MapperToUserDto(user));

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
        public async Task<ActionResult> Delete(int id)
        {
            var userFound = await usersService.GetUserById(id);

            if (userFound == null)
            {
                return NotFound();
            }

            var user = MapperToUser(userFound);

            return View(user);
        }

        // POST: UsersController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Delete(User user)
        {
            try
            {
                var userFound = await usersService.GetUserById(user.Id);

                if (userFound == null)
                {
                    return View();
                }

                var userDeleted = await usersService.DeleteUser(user.Id);

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        private User MapperToUser(UserDto userDto)
        {
            return new User
            {
                Id = userDto.Id,
                Email = userDto.Email,
                Name = userDto.Name,
                Username = userDto.Username,
                Password = userDto.Password
            };
        }

        private UserDto MapperToUserDto(User user)
        {
            return UserDto.Build(
              id: user.Id,
              email: user.Email,
              name: user.Name,
              username: user.Username,
              password: user.Password
            );
        }
    }
}