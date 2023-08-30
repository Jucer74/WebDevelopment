using Microsoft.AspNetCore.Mvc;
using MovieRank.Models;
using MovieRank.Services;

namespace MovieRank.Controllers
{
    public class MovieController : Controller
    {
        // Create a list of movies
        // private static List<Movie> _movies = LoadMovies();

        // LoadMovies method
        // private static List<Movie> LoadMovies()
        // {
        // }
        
        // Movimos la logica set, get a Services <- para acceder a los datos desde home,
        // sin embargo, no se si se editen.
        private static MovieService? _movieService;
        private List<Movie>? _movies;

        public MovieController(MovieService movieService)
        {
            _movieService = movieService;
        } 

        // GET: Movie
        public IActionResult Index()
        {
            return View();
        }

        // GET: Movie/Create
        public IActionResult Create()
        {
            return PartialView("Create");
        }

        // POST: Movie/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(IFormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return PartialView("Create");
            }
        }

        // GET: Movie/Edit/
        public IActionResult Edit(int id)
        {
            return PartialView("Edit");
        }

        // POST: Movie/Edit/
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO : Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return PartialView("Edit");
            }
        }

        // GET: Movie/Details/
        public IActionResult Details(int id)
        {
            return PartialView("Details");
        }

        // GET: Movie/Delete/
        public IActionResult Delete(int id)
        {
            return PartialView("Delete");
        }

        // POST: Movie/Delete/
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO : Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return PartialView("Delete");
            }
        }

        // GET: Movie/List/
        public IActionResult List()
        {
            _movies = _movieService!.GetMovies();
            return PartialView("List", _movies);
        }
    }
}