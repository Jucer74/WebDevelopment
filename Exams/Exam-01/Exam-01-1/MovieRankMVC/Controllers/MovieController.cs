using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using MovieRankMVC.Models;

namespace MovieRankMVC.Controllers
{
    public class MovieController : Controller
    {
        private static List<string> CustomGenres = new List<string>();
        private static List<Movie> moviesList = new List<Movie>();
        private readonly IWebHostEnvironment _webHostEnvironment;

        public MovieController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        // GET: MovieController
        public ActionResult Index()
        {
            return View(moviesList);
        }

        // GET: StudentsController/Details/5
        public ActionResult Details(int id)
        {
            var movie = moviesList.FirstOrDefault(x => x.Id == id);
            return View(movie);
        }

        // GET: StudentsController/Create
        public ActionResult Create()
        {
            var viewModel = new Movie
            {
                GenreOptions = GetCustomGenreOptions()
            };
            return View(viewModel);
        }

        // POST: StudentsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(IFormCollection collection, Movie model, IFormFile posterFile)
        {
            if (ModelState.IsValid)
            {
                var selectedImage = collection["SelectedImage"];
                if (posterFile != null && posterFile.Length > 0)
                {
                    // Leer el archivo de imagen y convertirlo a bytes
                    using (var memoryStream = new MemoryStream())
                    {
                        posterFile.CopyTo(memoryStream);
                    }
                }
                // Aquí puedes acceder al género seleccionado a través de model.SelectedGenre
                // y manejarlo según sea necesario

                moviesList.Add(model);

                // Agregar nuevo género personalizado si se proporciona
                if (!string.IsNullOrEmpty(model.NewGenre))
                {
                    CustomGenres.Add(model.NewGenre);
                }

                // Resto del código para guardar la película

                return RedirectToAction(nameof(Index));
            }

            // Si no hay géneros disponibles, establece GenreOptions como una lista vacía
            model.GenreOptions = GetCustomGenreOptions();

            return View(model);
        }




        // GET: StudentsController/Edit/5
        public ActionResult Edit(int id)
        {
            var movie = moviesList.FirstOrDefault(x => x.Id == id);
            return View(movie);
        }

        // POST: StudentsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: StudentsController/Delete/5
        public ActionResult Delete(int id)
        {
            var movie = moviesList.FirstOrDefault(x => x.Id == id);
            return View(movie);
        }

        // POST: StudentsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
        #region Private-Methods

        private List<SelectListItem> GetCustomGenreOptions()
        {
            return CustomGenres.Select(g => new SelectListItem { Value = g, Text = g }).ToList();
        }

        private static List<Movie> LoadMovies()
        {
            List<Movie> movies = new List<Movie>();

            return movies;

        }

        #endregion Private-Methods

    }
}
