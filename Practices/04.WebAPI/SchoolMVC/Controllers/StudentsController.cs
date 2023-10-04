using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using SchoolMVC.Config;
using WebDev.Services;
using SchoolMVC.Models;
using SchoolMVC.Services;
using System.Configuration;
using System.Threading.Tasks;

namespace SchoolMVC.Controllers
{
    public class StudentsController : Controller
    {
        private readonly StudentService _studentService;
        private readonly ApiConfiguration _apiConfiguration;
        private UsersService usersService;


        public StudentsController(StudentService studentService, IOptions<ApiConfiguration> apiConfiguration )
        {
            _studentService = studentService;
            _apiConfiguration = apiConfiguration.Value;
            usersService = new UsersService(_apiConfiguration.ApiUsersUrl);

        }

        // GET: StudentsController
        // GET: UsersController
        [HttpGet]
        public async Task<ActionResult> Index()
        {
            IList<UserDto> users = await usersService.GetUsers();

           Student = users.Select(userDto => MapperToUser(userDto)).ToList();

            return View(_userList);
        }

        public async Task<ActionResult> ByPage(int page, int limit)
        {
            var queryResult = await _studentService.ByPage(page, limit);
            return View(queryResult);
        }

        // GET: StudentsController/Details/5
        public async Task<ActionResult> Details(int id)
        {
            var studentFound = await _studentService.GetById(id);

            if (studentFound == null)
            {
                return NotFound();
            }

            return View(studentFound);
        }

        // GET: StudentsController/Create
        public ActionResult Create()
        {
            var student = new Student();
            return View(student);
        }

        // POST: StudentsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(Student student)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await _studentService.CreateStudent(student);
                    return RedirectToAction(nameof(Index));
                }

                return View(student);
            }
            catch
            {
                return View();
            }
        }

        // GET: StudentsController/Edit/5
        public async Task<ActionResult> Edit(int id)
        {
            var studentFound = await _studentService.GetById(id);

            if (studentFound == null)
            {
                return NotFound();
            }

            return View(studentFound);
        }

        // POST: StudentsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(Student student)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await _studentService.EditStudent(student.Id, student);
                    return RedirectToAction(nameof(Index));
                }

                return View(student);
            }
            catch
            {
                return View();
            }
        }

        // GET: StudentsController/Delete/5
        public async Task<ActionResult> Delete(int id)
        {
            var studentFound = await _studentService.GetById(id);

            if (studentFound == null)
            {
                return NotFound();
            }

            return View(studentFound);
        }

        // POST: StudentsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Delete(Student student)
        {
            try
            {
                await _studentService.DeleteStudent(student.Id);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.Configure<ApiConfiguration>(Configuration.GetSection("ApiConfiguration"));
        }
    }
}
