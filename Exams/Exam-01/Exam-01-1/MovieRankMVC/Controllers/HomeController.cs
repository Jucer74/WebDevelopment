using Microsoft.AspNetCore.Mvc;
using MovieRankMVC.Models;
using System.Diagnostics;

namespace MovieRankMVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            // Accede a la lista de películas del controlador Movies
            List<Movie> movies = MoviesController.moviesList;

            // Pasa la lista de películas a la vista
            return View(movies);
        }
        public IActionResult Logout()
        {

            return RedirectToAction("Login", "Users"); // Redirigir a la página de inicio
        }
 

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}