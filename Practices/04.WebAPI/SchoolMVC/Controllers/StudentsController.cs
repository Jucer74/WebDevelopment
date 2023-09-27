using Microsoft.AspNetCore.Mvc;
using SchoolMVC.Dtos;
using SchoolMVC.Models;
using SchoolMVC.Services;

namespace SchoolMVC.Controllers
{
    public class StudentsController : Controller
    {
        private readonly IStudentsService studentsService;
        public StudentsController() { 

}
        private static List<Student> studentList = null!;
        private static int numStudents;

        private static StudentService _studentService;

        public StudentsController(StudentService studentService)
        {
            _studentService = studentService;
        }

        // GET: StudentsController
       // public async Task<ActionResult> Index()
      //  {
          //  studentList = await _studentService.GetAll();
            //return View(studentList);
       // }

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
            student.DateOfBirth = DateTime.Today;
            student.Sex = 'M';
            return View(student);
        }

        // POST: StudentsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Student student)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    student.Id = ++numStudents;
                    studentList.Add(student);
                }

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: StudentsController/Edit/5
        public ActionResult Edit(int id)
        {
            var studentFound = studentList.FirstOrDefault(u => u.Id == id);

            if (studentFound == null)
            {
                return NotFound();
            }

            return View(studentFound);
        }

        // POST: StudentsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Student student)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var studentFound = studentList.FirstOrDefault(u => u.Id == student.Id);

                    if (studentFound == null)
                    {
                        return View();
                    }

                    studentFound.FirstName = student.FirstName;
                    studentFound.LastName = student.LastName;
                    studentFound.DateOfBirth = student.DateOfBirth;
                    studentFound.Sex = student.Sex;

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
        public ActionResult Delete(int id)
        {
            var studentFound = studentList.FirstOrDefault(u => u.Id == id);

            if (studentFound == null)
            {
                return NotFound();
            }

            return View(studentFound);
        }

        // POST: StudentsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(Student student)
        {
            try
            {
                var studentFound = studentList.FirstOrDefault(u => u.Id == student.Id);

                if (studentFound == null)
                {
                    return View();
                }

                studentList.Remove(studentFound);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}