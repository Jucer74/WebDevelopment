using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MovieRankMVC.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace MovieRankMVC.Controllers
{
    public class MoviesController : Controller
    {
        // Global Variables
        public static List<Movie> moviesList = LoadMovies();
        private readonly IWebHostEnvironment _webHostEnvironment; // Declaración de la variable

        // Constructor con inyección de dependencia
        public MoviesController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: MoviesController
        public IActionResult Index()
        {
            return View(moviesList); 
        }
       

        // GET: MoviesController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: MoviesController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Movie movie, IFormFile Poster, int Hours, int Minutes)
        {
            try
            {
                // Asignar el ID
                movie.Id = moviesList.Count + 1;

                // Verificar si el Poster es nulo o vacío al crear una nueva película
                if (Poster == null || Poster.Length == 0)
                {
                    ModelState.AddModelError("Poster", "The Poster is required");
                    return View(movie); // Retorna a la vista de creación con el error
                }

                // Procesar la imagen del póster
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images");
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + Poster.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    Poster.CopyTo(stream);
                }
                movie.Poster = uniqueFileName;

                // Combina las horas y minutos en el formato HH:MM
                movie.Duration = $"{Hours.ToString("00")}:{Minutes.ToString("00")}"; // <-- Añade esta línea aquí

                // Añadir la película a la lista
                moviesList.Add(movie);

                // Redirigir al índice
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "Error al crear la película: " + ex.Message);
                return View();
            }
        }


        private Movie GetMovieById(int id)
        {
            // Busca la película en la lista por su ID
            return moviesList.FirstOrDefault(movie => movie.Id == id);
        }
        private void UpdateMovie(Movie editedMovie)
        {
            // Find the movie in the list by its ID
            Movie existingMovie = moviesList.FirstOrDefault(movie => movie.Id == editedMovie.Id);

            if (existingMovie != null)
            {
                // Update the properties of the existing movie with the values from the edited movie
                existingMovie.Title = editedMovie.Title;
                existingMovie.Synopsis = editedMovie.Synopsis;
                existingMovie.Year = editedMovie.Year;
                existingMovie.Duration = editedMovie.Duration;
                existingMovie.Rate = editedMovie.Rate;
                existingMovie.Poster = editedMovie.Poster;
                existingMovie.Genres = editedMovie.Genres;
            }
        }

        // GET: MoviesController/Details/5
        public ActionResult Details(int id)
        {
            var movie = moviesList.Find(x => x.Id == id);

            return View(movie);
        }
        // GET: /Home/Edit/5
        public IActionResult Edit(int id)
        {
            // Retrieve the movie with the given id from your data source (e.g., database)
            Movie movie = GetMovieById(id);

            if (movie == null)
            {
                return NotFound();
            }

            return View(movie);
        }
        // POST: /Home/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Movie editedMovie, IFormFile Poster)
        {
            if (id != editedMovie.Id)
            {
                return NotFound();
            }

            if (Poster != null && Poster.Length > 0)
            {
                // Si hay un archivo de póster, procesarlo
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images");
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + Poster.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    Poster.CopyTo(stream);
                }
                editedMovie.Poster = uniqueFileName; // Actualiza el Poster si se ha subido uno nuevo
            }
            else
            {
                // Si no se ha subido un nuevo archivo, mantén el valor anterior de Poster
                var existingMovie = GetMovieById(id);
                if (existingMovie != null)
                {
                    editedMovie.Poster = existingMovie.Poster;
                }
                else
                {
                    ModelState.AddModelError("Poster", "The Poster is required");
                    return View(editedMovie);
                }
            }

            // Actualiza la película en la lista
            UpdateMovie(editedMovie);

            return RedirectToAction(nameof(Index));
        }





        // GET: MoviesController/Delete/5
        public ActionResult Delete(int id)
        {
            Movie movieToDelete = moviesList.Find(m => m.Id == id);

            return View(movieToDelete);
        }

        // POST: MoviesController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            Movie movieToDelete = moviesList.Find(m => m.Id == id);

            if (movieToDelete != null)
            {
                // Eliminar la película de la lista
                moviesList.Remove(movieToDelete);

                return RedirectToAction(nameof(Index));
            }
            else
            {
                // La película no se encontró, redirige a una página de error o maneja la situación
                return NotFound();
            }
        }

        private static List<Movie> LoadMovies()
        {
            List<Movie> movies = new List<Movie>();

            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Interstellar",
                Synopsis = "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                Year = 2014,
                Duration = "02:49",
                Rate = 4.6f,
                Poster = "Interestelar.png",
                Genres = "Sci-fi|Drama"
            });

            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "The Hangover",
                Synopsis = "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.",
                Year = 2009,
                Duration = "01:40",
                Rate = 4.0f,
                Poster = "The Hangover.jpg",
                Genres = "Comedy"
            });

            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Midnight in Paris",
                Synopsis = "While on a trip to Paris with his fiancée's family, a nostalgic screenwriter finds himself mysteriously going back to the 1920s every day at midnight.",
                Year = 2011,
                Duration = "01:34",
                Rate = 4.3f,
                Poster = "Midnight in Paris.jpg",
                Genres = "Romance|Fantasy"
            });

            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "The Hobbit: An Unexpected Journey",
                Synopsis = "A reluctant Hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home, and the gold within it from the dragon Smaug.",
                Year = 2012,
                Duration = "02:49",
                Rate = 4.2f,
                Poster = "The_Hobbit-_An_Unexpected_Journey.jpeg",
                Genres = "Fantasy|Adventure"
            });

            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "The Conjuring",
                Synopsis = "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
                Year = 2013,
                Duration = "01:52",
                Rate = 4.4f,
                Poster = "The Conjuring.jpg",
                Genres = "Horror|Mystery"
            });

            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "The Avengers",
                Synopsis = "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
                Year = 2012,
                Duration = "02:23",
                Rate = 4.7f,
                Poster = "The Avengers.jpg",
                Genres = "Action|Adventure"
            });

            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Gravity",
                Synopsis = "Two astronauts work together to survive after an accident leaves them stranded in space.",
                Year = 2013,
                Duration = "01:31",
                Rate = 4.5f,
                Poster = "gravity.jfif",
                Genres = "Sci-fi|Drama"
            });

            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "The Notebook",
                Synopsis = "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
                Year = 2004,
                Duration = "02:03",
                Rate = 4.8f,
                Poster = "TheNotebook.jpg",
                Genres = "Romance|Drama"
            });

            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Bridesmaids",
                Synopsis = "Competition between the maid of honor and a bridesmaid, over who is the bride's best friend, threatens to upend the life of an out-of-work pastry chef.",
                Year = 2011,
                Duration = "02:05",
                Rate = 4.1f,
                Poster = "Bridesmaids.jpg",
                Genres = "Comedy"
            });

            return movies;
        }



    }
}

