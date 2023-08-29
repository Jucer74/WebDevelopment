using Microsoft.AspNetCore.Mvc;
using MovieRankMVC.Models;
using System.Diagnostics;
using Microsoft.Extensions.Logging;
using MovieRankMVC.Controllers; // Importa el namespace de MoviesController

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
            List<Movie> moviesList = ViewBag.Movies as List<Movie>; // Accede a la lista desde el ViewBag
            return View(moviesList); // Pasa la lista de películas a la vista
        }


        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}