using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieRankMVC.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace MovieRankMVC.Controllers
{
    public class MoviesController : Controller
    {
        private static List<Movie> LoadMovies()
        {
            List<Movie> movies = new List<Movie>();

            movies.Add(new Movie() { Id = 1, Title = "Barbie", Synopsis = "Barbie sufre una crisis que la lleva a cuestionar su mundo y su existencia.", Year = 2023, Duration = "01:54", Rate = 7.4f, Poster = "Barbie.jpg", Genres = "Comedia | Aventura | Fantasía" });
            movies.Add(new Movie() { Id = 2, Title = "Oppenheimer", Synopsis = "La historia del científico estadounidense J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica.", Year = 2023, Duration = "03:00", Rate = 8.6f, Poster = "Oppenheimer.jpg", Genres = "Biografía | Drama | Historia" });
            movies.Add(new Movie() { Id = 3, Title = "Guardians of the Galaxy Vol. 3", Synopsis = "Aún afectado por la pérdida de Gamora, Peter Quill reúne a su equipo para defender el universo y a uno de los suyos.", Year = 2023, Duration = "02:30", Rate = 8.0f, Poster = "Guardians-of-the-galaxy-vol-3.jpg", Genres = "Acción | Aventura | Comedia" });
            movies.Add(new Movie() { Id = 4, Title = "Blue Beetle", Synopsis = "Un adolescente mexicano encuentra un escarabajo alienígena que le otorga una armadura con superpoderes.", Year = 2023, Duration = "02:07", Rate = 6.8f, Poster = "Blue-beetle.jpg", Genres = "Acción | Aventura | Ciencia Ficción" });
            movies.Add(new Movie() { Id = 5, Title = "Interstellar", Synopsis = "Un equipo de exploradores viaja a través de un agujero de gusano en el espacio para asegurar la supervivencia de la humanidad.", Year = 2014, Duration = "02:49", Rate = 8.7f, Poster = "Interstellar.jpg", Genres = "Aventura | Drama | Ciencia Ficción" });
            movies.Add(new Movie() { Id = 6, Title = "Avengers: Age of Ultron", Synopsis = "Cuando Tony Stark y Bruce Banner intentan reactivar un programa de mantenimiento de la paz, las cosas salen mal y los héroes deben detener al villano Ultron.", Year = 2015, Duration = "02:21", Rate = 7.3f, Poster = "Avengers-Age-of-Ultron.jpg", Genres = "Acción | Aventura | Ciencia Ficción" });
            movies.Add(new Movie() { Id = 7, Title = "Spider-Man: Across the Spider-Verse", Synopsis = "Miles Morales viaja a través del Multiverso y se une a otros Spider-People para enfrentar una nueva amenaza.", Year = 2023, Duration = "02:20", Rate = 8.8f, Poster = "Spider-man-across-the-spider-verse-part-one.jpg", Genres = "Animación | Acción | Aventura" });
            movies.Add(new Movie() { Id = 8, Title = "Mission: Impossible - Dead Reckoning Part One", Synopsis = "Ethan Hunt y su equipo deben encontrar un arma peligrosa antes de que caiga en manos equivocadas.", Year = 2023, Duration = "02:43", Rate = 8.0f, Poster = "Mission-impossible-dead-reckoning-part-one.jpg", Genres = "Acción | Aventura | Thriller" });
            movies.Add(new Movie() { Id = 9, Title = "Teenage Mutant Ninja Turtles: Mutant Mayhem", Synopsis = "Las Tortugas Ninja deben ganarse el amor de Nueva York mientras enfrentan a un ejército de mutantes.", Year = 2023, Duration = "01:39", Rate = 7.5f, Poster = "Teenage-mutant-ninja-turtles-mutant-mayhem.jpg", Genres = "Animación | Acción | Aventura" });
            movies.Add(new Movie() { Id = 10, Title = "Top Gun: Maverick", Synopsis = "Después de treinta años, Maverick lidera a los mejores graduados de TOP GUN en una misión que exige un gran sacrificio.", Year = 2022, Duration = "02:10", Rate = 8.3f, Poster = "Top-Gun-Maverick.jpg", Genres = "Drama | Acción" });
            movies.Add(new Movie() { Id = 11, Title = "Avengers: Endgame", Synopsis = "Tras los devastadores eventos de Infinity War, los Vengadores se reúnen para deshacer las acciones de Thanos.", Year = 2019, Duration = "03:01", Rate = 8.4f, Poster = "Avengers-Endgame.jpg", Genres = "Acción | Aventura | Ciencia Ficción" });
            movies.Add(new Movie() { Id = 12, Title = "Indiana Jones and the Dial of Destiny", Synopsis = "El arqueólogo Indiana Jones corre contra el tiempo para recuperar un legendario artefacto que puede cambiar el curso de la historia.", Year = 2023, Duration = "02:34", Rate = 6.8f, Poster = "Indiana-jones-and-the-dial-of-destiny.jpg", Genres = "Acción | Aventura" });
            movies.Add(new Movie() { Id = 13, Title = "Meg 2: The Trench", Synopsis = "Un equipo de investigación se enfrenta a múltiples amenazas mientras explora las profundidades del océano, incluyendo una operación minera malévola.", Year = 2023, Duration = "01:56", Rate = 5.5f, Poster = "Meg-2-the-trench.jpg", Genres = "Acción | Aventura | Terror" });
            movies.Add(new Movie() { Id = 14, Title = "The Last Voyage of the Demeter", Synopsis = "Una tripulación que navega desde Carpatia a Inglaterra descubre que lleva un cargamento muy peligroso.", Year = 2023, Duration = "01:58", Rate = 6.5f, Poster = "The-last-voyage-of-the-demeter.jpg", Genres = "Terror" });
            movies.Add(new Movie() { Id = 15, Title = "Haunted Mansion", Synopsis = "Una madre soltera compra una mansión embrujada y contrata a un grupo diverso de expertos para exorcizarla.", Year = 2023, Duration = "02:03", Rate = 6.2f, Poster = "Haunted-mansion.jpg", Genres = "Comedia | Drama | Familia" });
            movies.Add(new Movie() { Id = 16, Title = "Talk to Me", Synopsis = "Un grupo de amigos descubre cómo invocar espíritus usando una mano embalsamada, pero desencadenan fuerzas sobrenaturales aterradoras.", Year = 2023, Duration = "01:35", Rate = 7.5f, Poster = "Talk-to-me.jpg", Genres = "Terror | Thriller" });
            movies.Add(new Movie() { Id = 17, Title = "Sound of Freedom", Synopsis = "La historia de Tim Ballard, un ex agente del gobierno de EE. UU. que abandona su trabajo para rescatar niños de traficantes sexuales globales.", Year = 2020, Duration = "02:11", Rate = 7.8f, Poster = "Sound-of-freedom.jpg", Genres = "Acción | Drama | Thriller" });
            movies.Add(new Movie() { Id = 18, Title = "Jules", Synopsis = "Milton vive una vida tranquila en un pequeño pueblo de Pensilvania, pero todo cambia cuando un OVNI y su pasajero extraterrestre aterrizan en su patio trasero.", Year = 2023, Duration = "01:27", Rate = 7.3f, Poster = "Jules.jpg", Genres = "Drama" });
            movies.Add(new Movie() { Id = 19, Title = "Elemental", Synopsis = "Sigue a Ember y Wade en una ciudad donde coexisten residentes del fuego, agua, tierra y aire.", Year = 2023, Duration = "01:41", Rate = 7.0f, Poster = "Elemental.jpg", Genres = "Animación | Aventura | Comedia" });
            movies.Add(new Movie() { Id = 20, Title = "Black Panther: Wakanda Forever", Synopsis = "El pueblo de Wakanda lucha por proteger su hogar de las potencias mundiales mientras lloran la muerte del Rey T'Challa.", Year = 2022, Duration = "02:41", Rate = 6.7f, Poster = "Black-panther-wakanda-forever.jpg", Genres = "Aventura | Acción | Drama" });
            movies.Add(new Movie() { Id = 21, Title = "Ant-Man and the Wasp: Quantumania", Synopsis = "Scott Lang y Hope Van Dyne son arrastrados al Reino Cuántico, junto con los padres de Hope y la hija de Scott. Deben encontrar una forma de escapar, pero ¿qué secretos está ocultando la madre de Hope? ¿Y quién es el misterioso Kang?", Year = 2023, Duration = "02:04", Rate = 6.1f, Poster = "Ant-man-and-the-wasp-quantumania.png", Genres = "Acción | Aventura | Comedia" });
            movies.Add(new Movie() { Id = 22, Title = "The Matrix", Synopsis = "Cuando una hermosa desconocida lleva al hacker Neo a un mundo subterráneo, descubre la impactante verdad: la vida que conoce es la elaborada decepción de una malvada inteligencia cibernética.", Year = 1999, Duration = "02:16", Rate = 8.7f, Poster = "The-Matrix.jpg", Genres = "Acción | Ciencia Ficción" });
            movies.Add(new Movie() { Id = 23, Title = "Transformers: Rise of the Beasts", Synopsis = "Durante los años 90, una nueva facción de Transformers, los Maximals, se unen a los Autobots como aliados en la batalla por la Tierra.", Year = 2023, Duration = "02:07", Rate = 6.1f, Poster = "Transformers-rise-of-the-beasts.jpg", Genres = "Acción | Aventura | Ciencia Ficción" });
            movies.Add(new Movie() { Id = 24, Title = "The Super Mario Bros. Movie", Synopsis = "La historia de los Super Mario Bros. en su viaje a través del Reino Champiñón.", Year = 2023, Duration = "01:32", Rate = 7.1f, Poster = "The-super-mario-bros-movie.jpg", Genres = "Animación | Aventura | Comedia" });
            movies.Add(new Movie() { Id = 25, Title = "The Little Mermaid", Synopsis = "Una joven sirena hace un trato con una bruja del mar para intercambiar su hermosa voz por piernas humanas y así explorar el mundo de la superficie y conquistar el corazón de un príncipe.", Year = 2023, Duration = "02:15", Rate = 7.2f, Poster = "The-little-mermaid.jpg", Genres = "Aventura | Familia | Fantasía" });
            movies.Add(new Movie() { Id = 26, Title = "Titanic", Synopsis = "Un aristócrata de diecisiete años se enamora de un artista pobre a bordo del lujoso y trágicamente famoso R.M.S. Titanic.", Year = 1997, Duration = "03:14", Rate = 7.9f, Poster = "Titanic.jpg", Genres = "Drama | Romance" });
            movies.Add(new Movie() { Id = 27, Title = "Spider-Man", Synopsis = "Después de ser picado por una araña genéticamente modificada, un adolescente tímido adquiere habilidades similares a las de una araña y lucha contra la injusticia como un superhéroe enmascarado mientras enfrenta a un enemigo vengativo.", Year = 2002, Duration = "02:01", Rate = 7.4f, Poster = "Spider-Man.jpg", Genres = "Acción | Aventura | Ciencia Ficción" });
            movies.Add(new Movie() { Id = 28, Title = "Batman: The Dark Knight", Synopsis = "Cuando la amenaza conocida como el Joker siembra el caos y la confusión en la gente de Gotham, Batman debe enfrentar una de las pruebas más grandes de su habilidad para luchar contra la injusticia, tanto psicológica como físicamente.", Year = 2008, Duration = "02:32", Rate = 9.0f, Poster = "Batman-the-dark-knight.jpg", Genres = "Acción | Crimen | Drama" });
            movies.Add(new Movie() { Id = 29, Title = "Captain America: The First Avenger", Synopsis = "Steve Rogers, un soldado militar rechazado, se transforma en el Capitán América después de tomar una dosis de un suero de super soldado. Pero ser el Capitán América tiene un precio, ya que intenta derrocar a un belicista y a una organización terrorista.", Year = 2011, Duration = "02:04", Rate = 6.9f, Poster = "Captain-America-The-First-Avenger.jpg", Genres = "Acción | Aventura | Ciencia Ficción" });
            movies.Add(new Movie() { Id = 30, Title = "The Lord of the Rings: The Two Towers", Synopsis = "Mientras Frodo y Sam se acercan a Mordor con la ayuda de Gollum, la comunidad dividida se enfrenta a Saruman y sus hordas de Isengard.", Year = 2002, Duration = "02:59", Rate = 8.8f, Poster = "The-Lord-of-the-Rings-The-Two-Towers.jpg", Genres = "Aventura | Acción | Drama" });

            return movies;
        }

        //global Variables
        private static List<Movie> moviesList = LoadMovies();

        // GET: MoviesController
        public ActionResult Index()
        {
            ViewBag.MoviesList = moviesList; // Asignar la lista a ViewBag
            return View(ViewBag.MoviesList);
        }

        // GET: MoviesController/Details/5
        public ActionResult Details(int id)
        {
            var movie = moviesList.FirstOrDefault(x => x.Id == id);
            return View(movie);
        }

        // GET: MoviesController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: MoviesController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Movie movie)
        {
            try
            {
                // Obtener el ID para la nueva película
                int newId = moviesList.Count + 1;
                movie.Id = newId;

                moviesList.Add(movie);

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
            var movie = moviesList.FirstOrDefault(x => x.Id == id);
            return View(movie);
        }

        // POST: MoviesController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Movie movie)
        {
            try
            {
                // Actualizar la película en la lista (moviesList)
                var existingMovie = moviesList.FirstOrDefault(x => x.Id == movie.Id);
                existingMovie.Title = movie.Title;
                existingMovie.Synopsis = movie.Synopsis;
                existingMovie.Year = movie.Year;
                existingMovie.Duration = movie.Duration;
                existingMovie.Rate = movie.Rate;
                existingMovie.Poster = movie.Poster;
                existingMovie.Genres = movie.Genres;

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
            var movie = moviesList.FirstOrDefault(x => x.Id == id);
            return View(movie);
        }

        // POST: MoviesController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            var movieToDelete = moviesList.FirstOrDefault(x => x.Id == id);
            moviesList.Remove(movieToDelete);

            // Reenumerar los IDs para mantener el orden
            for (int i = 0; i < moviesList.Count; i++)
            {
                moviesList[i].Id = i + 1;
            }

            return RedirectToAction(nameof(Index));
        }



    }
}
