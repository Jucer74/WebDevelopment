using Microsoft.AspNetCore.Mvc;
using MovieRankMVC.Models;
using System.Diagnostics;
using Microsoft.Extensions.Logging;
using MovieRankMVC.Controllers;

namespace MovieRankMVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        private static List<Movie> LoadMovies()
        {
            List<Movie> movies = new()
            {
            new Movie() { Id = 1, Title = "Barbie", Synopsis = "Barbie sufre una crisis que la lleva a cuestionar su mundo y su existencia.", Year = 2023, Duration = "01:54", Rate = 7.4f, Poster = "Barbie.jpg", Genres = "Comedia | Aventura | Fantasía" },
            new Movie() { Id = 2, Title = "Oppenheimer", Synopsis = "La historia del científico estadounidense J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica.", Year = 2023, Duration = "03:00", Rate = 8.6f, Poster = "Oppenheimer.jpg", Genres = "Biografía | Drama | Historia" },
            new Movie() { Id = 3, Title = "Guardians of the Galaxy Vol. 3", Synopsis = "Aún afectado por la pérdida de Gamora, Peter Quill reúne a su equipo para defender el universo y a uno de los suyos.", Year = 2023, Duration = "02:30", Rate = 8.0f, Poster = "Guardians-of-the-galaxy-vol-3.jpg", Genres = "Acción | Aventura | Comedia" },
            new Movie() { Id = 4, Title = "Blue Beetle", Synopsis = "Un adolescente mexicano encuentra un escarabajo alienígena que le otorga una armadura con superpoderes.", Year = 2023, Duration = "02:07", Rate = 6.8f, Poster = "Blue-beetle.jpg", Genres = "Acción | Aventura | Ciencia Ficción" },
            new Movie() { Id = 5, Title = "Interstellar", Synopsis = "Un equipo de exploradores viaja a través de un agujero de gusano en el espacio para asegurar la supervivencia de la humanidad.", Year = 2014, Duration = "02:49", Rate = 8.7f, Poster = "Interstellar.jpg", Genres = "Aventura | Drama | Ciencia Ficción" },
            new Movie() { Id = 6, Title = "Avengers: Age of Ultron", Synopsis = "Cuando Tony Stark y Bruce Banner intentan reactivar un programa de mantenimiento de la paz, las cosas salen mal y los héroes deben detener al villano Ultron.", Year = 2015, Duration = "02:21", Rate = 7.3f, Poster = "Avengers-Age-of-Ultron.jpg", Genres = "Acción | Aventura | Ciencia Ficción" },
            new Movie() { Id = 7, Title = "Spider-Man: Across the Spider-Verse", Synopsis = "Miles Morales viaja a través del Multiverso y se une a otros Spider-People para enfrentar una nueva amenaza.", Year = 2023, Duration = "02:20", Rate = 8.8f, Poster = "Spider-man-across-the-spider-verse-part-one.jpg", Genres = "Animación | Acción | Aventura" },
            new Movie() { Id = 8, Title = "Mission: Impossible - Dead Reckoning Part One", Synopsis = "Ethan Hunt y su equipo deben encontrar un arma peligrosa antes de que caiga en manos equivocadas.", Year = 2023, Duration = "02:43", Rate = 8.0f, Poster = "Mission-impossible-dead-reckoning-part-one.jpg", Genres = "Acción | Aventura | Thriller" },
            new Movie() { Id = 9, Title = "Teenage Mutant Ninja Turtles: Mutant Mayhem", Synopsis = "Las Tortugas Ninja deben ganarse el amor de Nueva York mientras enfrentan a un ejército de mutantes.", Year = 2023, Duration = "01:39", Rate = 7.5f, Poster = "Teenage-mutant-ninja-turtles-mutant-mayhem.jpg", Genres = "Animación | Acción | Aventura" },
            new Movie() { Id = 10, Title = "Top Gun: Maverick", Synopsis = "Después de treinta años, Maverick lidera a los mejores graduados de TOP GUN en una misión que exige un gran sacrificio.", Year = 2022, Duration = "02:10", Rate = 8.3f, Poster = "Top-Gun-Maverick.jpg", Genres = "Drama | Acción" },

            };

            return movies;
        }

        
        private static List<Movie> moviesList = LoadMovies();

        public IActionResult Index()
        {
            List<Movie> moviesList = GetMoviesList();
            ViewBag.Movies = moviesList;
            return View(moviesList); 
        }

        public List<Movie> GetMoviesList()
        {
            return moviesList;
        }

        public ActionResult Details(int id)
        {
            var movie = moviesList.FirstOrDefault(x => x.Id == id);
            return View(movie);
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