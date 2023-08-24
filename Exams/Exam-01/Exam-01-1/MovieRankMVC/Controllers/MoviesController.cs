using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieRankMVC.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace MovieRankMVC.Controllers
{
    public class MoviesController : Controller
    {

        //global Variables
        private static List<Movie> moviesList = LoadMovies();

        // GET: MoviesController
        public ActionResult Index()
        {
            return View(moviesList);
        }

        // GET: MoviesController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: MoviesController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: MoviesController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
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

        // GET: MoviesController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: MoviesController/Edit/5
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

        // GET: MoviesController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: MoviesController/Delete/5
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

        private static List<Movie> LoadMovies()
        {
            List<Movie> movies = new List<Movie>();

            movies.Add(new Movie() { Id = 1, Title = "El Misterio en la Torre", Synopsis = "Intrigante película sobre un misterioso crimen en una antigua torre. Un detective debe resolver el enigma antes de que sea demasiado tarde.", Year = 2020, Duration = "2:00", Rate = 8, Poster = "misterio_torre.jpeg", Genres = "Misterio | Suspense" });

            movies.Add(new Movie() { Id = 2, Title = "Reinos Olvidados", Synopsis = "Épica aventura en un mundo de fantasía donde un grupo de héroes debe unir fuerzas para salvar los reinos de la destrucción. Magia, monstruos y valentía se entrelazan en esta historia.", Year = 2015, Duration = "2:30", Rate = 9, Poster = "reinos_olvidados.jpeg", Genres = "Fantasía | Acción" });

            movies.Add(new Movie() { Id = 3, Title = "El Último Viaje", Synopsis = "Un emocionante documental que sigue a un grupo de científicos mientras exploran las profundidades del océano en busca de criaturas desconocidas. Enfrentarán desafíos asombrosos en su búsqueda de descubrimientos.", Year = 2022, Duration = "1:45", Rate = 7, Poster = "ultimo_viaje.jpeg", Genres = "Documental | Aventura" });

            movies.Add(new Movie() { Id = 4, Title = "El Enigma del Tiempo", Synopsis = "Un thriller de ciencia ficción que sigue a un viajero del tiempo accidental que debe desentrañar un complot para alterar el curso de la historia. Cada decisión cuenta mientras lucha por restaurar la línea temporal correcta.", Year = 2018, Duration = "2:10", Rate = 8, Poster = "enigma_tiempo.jpeg", Genres = "Ciencia Ficción | Suspense" });

            movies.Add(new Movie() { Id = 5, Title = "El Legado del Dragón", Synopsis = "En un mundo donde los dragones y los humanos coexisten, un joven descubre un huevo de dragón en un antiguo bosque. A medida que la amistad entre ellos crece, se enfrentan a desafíos que pondrán a prueba su unión.", Year = 2010, Duration = "1:50", Rate = 7, Poster = "legado_dragon.jpeg", Genres = "Animación | Aventura" });

            return movies;
        }

        #endregion Private-Methods

    }
}
