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
        private static List<Movie> moviesList = LoadMovies();
        private readonly IWebHostEnvironment _webHostEnvironment; // Agrega esta variable
        public MoviesController(IWebHostEnvironment webHostEnvironment) // Agrega el parámetro al constructor
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

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                var newMovie = new Movie
                {
                    Id = moviesList.Count + 1,
                    Title = collection["Title"].FirstOrDefault() ?? "", // Convertir a string y luego usar coalescencia nula
                    Synopsis = collection["Synopsis"].FirstOrDefault() ?? "", // Convertir a string y luego usar coalescencia nula
                };

                if (int.TryParse(collection["Year"].FirstOrDefault(), out int year))
                {
                    newMovie.Year = year;
                }

                newMovie.Duration = collection["Duration"].FirstOrDefault() ?? ""; // Convertir a string y luego usar coalescencia nula

                if (float.TryParse(collection["Rate"].FirstOrDefault(), out float rate))
                {
                    newMovie.Rate = rate;
                }
                // Procesar la imagen del póster
                if (collection.Files.Count > 0)
                {
                    var posterImage = collection.Files[0];
                    if (posterImage.Length > 0)
                    {
                        // Obtener la ruta de la carpeta donde se almacenarán las imágenes
                        string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images");

                        // Generar un nombre de archivo único para la imagen
                        string uniqueFileName = Guid.NewGuid().ToString() + "_" + posterImage.FileName;

                        // Combinar la ruta de la carpeta con el nombre del archivo
                        string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                        // Guardar la imagen en la carpeta
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            posterImage.CopyTo(stream);
                        }

                        // Asignar el nombre del archivo al campo Poster
                        newMovie.Poster = uniqueFileName;
                    }
                }
                newMovie.Poster = collection["Poster"].FirstOrDefault() ?? ""; // Convertir a string y luego usar coalescencia nula
                newMovie.Genres = collection["Genres"].FirstOrDefault() ?? ""; // Convertir a string y luego usar coalescencia nula

                moviesList.Add(newMovie);

                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
                // Manejar errores de manera adecuada (log, notificación, etc.)
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
        public IActionResult Edit(int id, Movie editedMovie)
        {
            if (id != editedMovie.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                // Update the edited movie in your data source
                UpdateMovie(editedMovie);

                return RedirectToAction(nameof(Index));
            }

            return View(editedMovie);
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

            int idCounter = 1; // Contador para asignar IDs únicos

            movies.Add(new Movie()
            {
 
                Title = "The Mysterious Galaxy",
                Synopsis = "A group of explorers discovers a hidden galaxy with strange phenomena.",
                Year = 2010,
                Duration = "02:15",
                Rate = 4.5f,
                Poster = "mysterious-galaxy.jpg",
                Genres = "Sci-fi|Mystery"
            });

            movies.Add(new Movie()
            {
                Id = idCounter++,
                Title = "Comedy Chaos",
                Synopsis = "Hilarious misadventures unfold as a small town hosts an outrageous comedy festival.",
                Year = 2015,
                Duration = "01:50",
                Rate = 3.8f,
                Poster = "comedy-chaos.jpg",
                Genres = "Comedy"
            });

            movies.Add(new Movie()
            {
                Id = idCounter++,
                Title = "Love in Paris",
                Synopsis = "Two strangers find unexpected romance on the charming streets of Paris.",
                Year = 2018,
                Duration = "02:05",
                Rate = 4.2f,
                Poster = "love-in-paris.jpg",
                Genres = "Romance|Drama"
            });

            movies.Add(new Movie()
            {
                Id = idCounter++,
                Title = "Fantasy Quest",
                Synopsis = "A young hero embarks on a mythical journey to save a fantastical world.",
                Year = 2013,
                Duration = "02:20",
                Rate = 4.0f,
                Poster = "fantasy-quest.jpg",
                Genres = "Fantasy|Adventure"
            });

            movies.Add(new Movie()
            {
                Id = idCounter++,
                Title = "Horror House",
                Synopsis = "A group of friends enters a haunted house, only to face their darkest fears.",
                Year = 2017,
                Duration = "01:45",
                Rate = 4.3f,
                Poster = "horror-house.jpg",
                Genres = "Horror|Mystery"
            });

            movies.Add(new Movie()
            {
                Id = idCounter++,
                Title = "Action Avengers",
                Synopsis = "A team of skilled heroes assembles to thwart a supervillain's evil plans.",
                Year = 2012,
                Duration = "02:30",
                Rate = 4.8f,
                Poster = "action-avengers.jpg",
                Genres = "Action|Adventure"
            });

            movies.Add(new Movie()
            {
                Id = idCounter++,
                Title = "Sci-Fi Explorers",
                Synopsis = "Brave astronauts journey through space to uncover the mysteries of the universe.",
                Year = 2011,
                Duration = "02:10",
                Rate = 4.4f,
                Poster = "sci-fi-explorers.jpg",
                Genres = "Sci-fi|Adventure"
            });

            movies.Add(new Movie()
            {
                Id = idCounter++,
                Title = "Romantic Retreat",
                Synopsis = "A couple escapes to a picturesque island for a romantic getaway.",
                Year = 2019,
                Duration = "02:00",
                Rate = 4.6f,
                Poster = "romantic-retreat.jpg",
                Genres = "Romance|Drama"
            });

            movies.Add(new Movie()
            {
                Id = idCounter++,
                Title = "Comedy Central",
                Synopsis = "Craziness ensues as a group of friends navigates a series of comedic mishaps.",
                Year = 2014,
                Duration = "01:55",
                Rate = 3.9f,
                Poster = "comedy-central.jpg",
                Genres = "Comedy"
            });


            return movies;
        }

    }
}

