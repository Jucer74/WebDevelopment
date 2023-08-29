using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using MovieRankMVC.Models;

namespace MovieRankMVC.Controllers
{
    public class MovieController : Controller
    {
        private static List<string> CustomGenres = new List<string>();
        private static List<Movie> moviesList = LoadMovies();
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
        public ActionResult Create(IFormCollection collection, Movie model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    // Aquí puedes acceder al género seleccionado a través de model.SelectedGenre
                    // y manejarlo según sea necesario
                    var newMovie = new Movie
                    {
                        Title = model.Title,
                        Synopsis = model.Synopsis,
                        Duration = model.Duration,
                        Rate = model.Rate,
                        Poster = model.Poster,
                        SelectedGenre = model.SelectedGenre
                    };
                    moviesList.Add(newMovie);

                    // Agregar nuevo género personalizado si se proporciona
                    if (!string.IsNullOrEmpty(model.NewGenre))
                    {
                        CustomGenres.Add(model.NewGenre);
                        model.GenreOptions = GetCustomGenreOptions();
                    }

                    return RedirectToAction(nameof(Index));
                }
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                model.GenreOptions = GetCustomGenreOptions();
                return View();
            }
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
