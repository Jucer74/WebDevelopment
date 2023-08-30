using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieRank.Models;
using MovieRank.Services;

namespace MovieRank.Controllers
{
    public class MovieController : Controller
    {
        private readonly MovieService _movieService;

        public MovieController(MovieService movieService)
        {
            _movieService = movieService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View("Create");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Movie movie)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _movieService.AddMovie(movie);
                    return RedirectToAction(nameof(Index));
                }

                return View(movie);
            }
            catch
            {
                return PartialView("Create");
            }
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            Movie movie = _movieService.GetMovieById(id);
            if (movie == null)
            {
                return NotFound();
            }

            return View(movie);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Movie editedMovie)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _movieService.UpdateMovie(id, editedMovie);
                    return RedirectToAction(nameof(Index));
                }

                return View(editedMovie);
            }
            catch
            {
                return PartialView("Edit");
            }
        }

        [HttpGet]
        public IActionResult Details(int id)
        {
            Movie movie = _movieService.GetMovieById(id);
            if (movie == null)
            {
                return NotFound();
            }

            return View(movie);
        }

        [HttpGet]
        public IActionResult Delete(int id)
        {
            Movie movie = _movieService.GetMovieById(id);
            if (movie == null)
            {
                return NotFound();
            }

            return View(movie);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id)
        {
            try
            {
                _movieService.DeleteMovie(id);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return PartialView("Delete");
            }
        }

        [HttpGet]
        public IActionResult List()
        {
            List<Movie> movies = _movieService.GetMovies();
            return PartialView("List", movies);
        }
    }
}
