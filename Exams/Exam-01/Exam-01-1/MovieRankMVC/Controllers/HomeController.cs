using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieRank.Models;
using MovieRank.Services;


namespace MovieRank.Controllers;

[Authorize]
public class HomeController : Controller
{
    private readonly MovieService? _movieService;
    private List<Movie>? _movies = null!;

    public HomeController(MovieService movieService)
    {
        _movieService = movieService;
    }

    public async Task<IActionResult> Index()
    {
        _movies = _movieService.GetMovies(); // Asumiendo que existe un método GetMoviesAsync en MovieService

        if (_movies != null)
        {
            ViewBag.Movies = _movies;
        }
        else
        {
            ViewBag.Movies =
                new List<Movie>(); // Otra opción es asignar una lista vacía en caso de que no haya películas.
        }

        return View();
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    public IActionResult MovieDetails(int id)
    {
        Movie movie = _movieService.GetMovieById(id);
        if (movie == null)
        {
            return NotFound();
        }

        return View(movie);
    }
}