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
                new Movie() { Id = 13, Title = "Meg 2: The Trench", Synopsis = "Un equipo de investigación se enfrenta a múltiples amenazas mientras explora las profundidades del océano, incluyendo una operación minera malévola.", Year = 2023, Duration = "01:56", Rate = 5.5f, Poster = "Meg-2-the-trench.jpg", Genres = "Acción | Aventura | Terror" },
                new Movie() { Id = 14, Title = "The Last Voyage of the Demeter", Synopsis = "Una tripulación que navega desde Carpatia a Inglaterra descubre que lleva un cargamento muy peligroso.", Year = 2023, Duration = "01:58", Rate = 6.5f, Poster = "The-last-voyage-of-the-demeter.jpg", Genres = "Terror" },
                new Movie() { Id = 15, Title = "Haunted Mansion", Synopsis = "Una madre soltera compra una mansión embrujada y contrata a un grupo diverso de expertos para exorcizarla.", Year = 2023, Duration = "02:03", Rate = 6.2f, Poster = "Haunted-mansion.jpg", Genres = "Comedia | Drama | Familia" },
                new Movie() { Id = 16, Title = "Talk to Me", Synopsis = "Un grupo de amigos descubre cómo invocar espíritus usando una mano embalsamada, pero desencadenan fuerzas sobrenaturales aterradoras.", Year = 2023, Duration = "01:35", Rate = 7.5f, Poster = "Talk-to-me.jpg", Genres = "Terror | Thriller" },
                new Movie() { Id = 17, Title = "Sound of Freedom", Synopsis = "La historia de Tim Ballard, un ex agente del gobierno de EE. UU. que abandona su trabajo para rescatar niños de traficantes sexuales globales.", Year = 2020, Duration = "02:11", Rate = 7.8f, Poster = "Sound-of-freedom.jpg", Genres = "Acción | Drama | Thriller" },
                new Movie() { Id = 18, Title = "Jules", Synopsis = "Milton vive una vida tranquila en un pequeño pueblo de Pensilvania, pero todo cambia cuando un OVNI y su pasajero extraterrestre aterrizan en su patio trasero.", Year = 2023, Duration = "01:27", Rate = 7.3f, Poster = "Jules.jpg", Genres = "Drama" },
                new Movie() { Id = 19, Title = "Elemental", Synopsis = "Sigue a Ember y Wade en una ciudad donde coexisten residentes del fuego, agua, tierra y aire.", Year = 2023, Duration = "01:41", Rate = 7.0f, Poster = "Elemental.jpg", Genres = "Animación | Aventura | Comedia" },
                new Movie() { Id = 20, Title = "Black Panther: Wakanda Forever", Synopsis = "El pueblo de Wakanda lucha por proteger su hogar de las potencias mundiales mientras lloran la muerte del Rey T'Challa.", Year = 2022, Duration = "02:41", Rate = 6.7f, Poster = "Black-panther-wakanda-forever.jpg", Genres = "Aventura | Acción | Drama" },
                new Movie() { Id = 21, Title = "Ant-Man and the Wasp: Quantumania", Synopsis = "Scott Lang y Hope Van Dyne son arrastrados al Reino Cuántico, junto con los padres de Hope y la hija de Scott. Deben encontrar una forma de escapar, pero ¿qué secretos está ocultando la madre de Hope? ¿Y quién es el misterioso Kang?", Year = 2023, Duration = "02:04", Rate = 6.1f, Poster = "Ant-man-and-the-wasp-quantumania.png", Genres = "Acción | Aventura | Comedia" },
                new Movie() { Id = 22, Title = "The Matrix", Synopsis = "Cuando una hermosa desconocida lleva al hacker Neo a un mundo subterráneo, descubre la impactante verdad: la vida que conoce es la elaborada decepción de una malvada inteligencia cibernética.", Year = 1999, Duration = "02:16", Rate = 8.7f, Poster = "The-Matrix.jpg", Genres = "Acción | Ciencia Ficción" },
                new Movie() { Id = 23, Title = "Transformers: Rise of the Beasts", Synopsis = "Durante los años 90, una nueva facción de Transformers, los Maximals, se unen a los Autobots como aliados en la batalla por la Tierra.", Year = 2023, Duration = "02:07", Rate = 6.1f, Poster = "Transformers-rise-of-the-beasts.jpg", Genres = "Acción | Aventura | Ciencia Ficción" },
                new Movie() { Id = 24, Title = "The Super Mario Bros. Movie", Synopsis = "La historia de los Super Mario Bros. en su viaje a través del Reino Champiñón.", Year = 2023, Duration = "01:32", Rate = 7.1f, Poster = "The-super-mario-bros-movie.jpg", Genres = "Animación | Aventura | Comedia" },
                new Movie() { Id = 25, Title = "The Little Mermaid", Synopsis = "Una joven sirena hace un trato con una bruja del mar para intercambiar su hermosa voz por piernas humanas y así explorar el mundo de la superficie y conquistar el corazón de un príncipe.", Year = 2023, Duration = "02:15", Rate = 7.2f, Poster = "The-little-mermaid.jpg", Genres = "Aventura | Familia | Fantasía" },
                new Movie() { Id = 26, Title = "Titanic", Synopsis = "Un aristócrata de diecisiete años se enamora de un artista pobre a bordo del lujoso y trágicamente famoso R.M.S. Titanic.", Year = 1997, Duration = "03:14", Rate = 7.9f, Poster = "Titanic.jpg", Genres = "Drama | Romance" },
                new Movie() { Id = 27, Title = "Spider-Man", Synopsis = "Después de ser picado por una araña genéticamente modificada, un adolescente tímido adquiere habilidades similares a las de una araña y lucha contra la injusticia como un superhéroe enmascarado mientras enfrenta a un enemigo vengativo.", Year = 2002, Duration = "02:01", Rate = 7.4f, Poster = "Spider-Man.jpg", Genres = "Acción | Aventura | Ciencia Ficción" },
                new Movie() { Id = 28, Title = "Batman: The Dark Knight", Synopsis = "Cuando la amenaza conocida como el Joker siembra el caos y la confusión en la gente de Gotham, Batman debe enfrentar una de las pruebas más grandes de su habilidad para luchar contra la injusticia, tanto psicológica como físicamente.", Year = 2008, Duration = "02:32", Rate = 9.0f, Poster = "Batman-the-dark-knight.jpg", Genres = "Acción | Crimen | Drama" },
                new Movie() { Id = 29, Title = "Captain America: The First Avenger", Synopsis = "Steve Rogers, un soldado militar rechazado, se transforma en el Capitán América después de tomar una dosis de un suero de super soldado. Pero ser el Capitán América tiene un precio, ya que intenta derrocar a un belicista y a una organización terrorista.", Year = 2011, Duration = "02:04", Rate = 6.9f, Poster = "Captain-America-The-First-Avenger.jpg", Genres = "Acción | Aventura | Ciencia Ficción" },
                new Movie() { Id = 30, Title = "The Lord of the Rings: The Two Towers", Synopsis = "Mientras Frodo y Sam se acercan a Mordor con la ayuda de Gollum, la comunidad dividida se enfrenta a Saruman y sus hordas de Isengard.", Year = 2002, Duration = "02:59", Rate = 8.8f, Poster = "The-Lord-of-the-Rings-The-Two-Towers.jpg", Genres = "Aventura | Acción | Drama" }
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