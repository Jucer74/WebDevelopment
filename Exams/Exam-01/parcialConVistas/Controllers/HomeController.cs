using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieRank.Models;
using MovieRank.Services;


namespace MovieRank.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly MovieService? _movieService;
    private List<Movie>? _movies = null!;

    public HomeController(ILogger<HomeController> logger, MovieService movieService)
    {
        _movieService = movieService;
        _logger = logger;
    }
    
    public IActionResult Index()
    {
        //if (User.Identity != null && !User.Identity.IsAuthenticated)
        //{
        //    return PartialView("_LoginPartial");
        //}
        // Debug.Assert(User.Identity != null, "User.Identity != null");
        // if (User.Identity.IsAuthenticated)
        // {
        //     Console.Out.Write($"{User.Identity.ToJson()}");
        // }
        // else
        // {
        //     var loginView = new LoginViewModel();
        //     return PartialView("_LoginPartial", loginView);
        // }
        // login redirection to modal esta como raro.
        
        _movies = _movieService!.GetMovies();
        ViewBag.Movies = _movies ?? throw new InvalidOperationException(); 
        return View();
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