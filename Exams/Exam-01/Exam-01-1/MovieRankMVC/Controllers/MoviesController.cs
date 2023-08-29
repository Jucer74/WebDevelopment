using Microsoft.AspNetCore.Mvc;
using MovieRankMVC.Models;

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
        private Movie? GetMovieById(int id)
        {
            // Busca la película en la lista por su ID
            return moviesList.Find(movie => movie.Id == id);
        }



        private void UpdateMovie(Movie editedMovie)
        {
            // Find the movie in the list by its ID
            Movie existingMovie = moviesList.Find(movie => movie.Id == editedMovie.Id);

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

            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Barbie",
                Synopsis = "Barbie suffers a crisis that leads her to question her world and her existence.",
                Year = 2023,
                Duration = "01:54",
                Rate = 7.4f,
                Poster = "Barbie.jpg",
                Genres = "Comedy|Adventure|Fantasy"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Guardians of the Galaxy Vol. 3",
                Synopsis = "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own - a mission that could mean the end of the Guardians if not successful.",
                Year = 2023,
                Duration = "02:30",
                Rate = 8.0f,
                Poster = "Guardians-of-the-galaxy-vol-3.jpg",
                Genres = "Action|Adventure|Comedy"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Blue Beetle",
                Synopsis = "A Mexican teenager finds an alien beetle that gives him superpowered armor.",
                Year = 2023,
                Duration = "02:07",
                Rate = 6.8f,
                Poster = "Blue-beetle.jpg",
                Genres = "Action|Adventure|Sci-Fi"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Avengers: Age of Ultron",
                Synopsis = "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earths mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
                Year = 2015,
                Duration = "02:21",
                Rate = 7.3f,
                Poster = "Avengers-Age-of-Ultron.jpg",
                Genres = "Action|Adventure|Sci-Fi"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Spider-Man: Across the Spider-Verse",
                Synopsis = "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
                Year = 2023,
                Duration = "02:20",
                Rate = 8.8f,
                Poster = "Spider-man-across-the-spider-verse-part-one.jpg",
                Genres = "Animation|Action|Adventure"
            });

            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Mission: Impossible - Dead Reckoning Part One",
                Synopsis = "Ethan Hunt and his IMF team must track down a dangerous weapon before it falls into the wrong hands.",
                Year = 2023,
                Duration = "02:43",
                Rate = 8.0f,
                Poster = "Mission-impossible-dead-reckoning-part-one.jpg",
                Genres = "Action|Adventure|Thriller"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Teenage Mutant Ninja Turtles: Mutant Mayhem",
                Synopsis = "The film follows the Turtle brothers as they work to earn the love of New York City while facing down an army of mutants.",
                Year = 2023,
                Duration = "01:39",
                Rate = 7.5f,
                Poster = "Teenage-mutant-ninja-turtles-mutant-mayhem.jpg",
                Genres = "Animation|Action|Adventure"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Avengers: Endgame",
                Synopsis = "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.",
                Year = 2019,
                Duration = "03:01",
                Rate = 8.4f,
                Poster = "Avengers-Endgame.jpg",
                Genres = "Action|Adventure|Sci-Fi"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Indiana Jones and the Dial of Destiny",
                Synopsis = "Archaeologist Indiana Jones races against time to retrieve a legendary artifact that can change the course of history.",
                Year = 2023,
                Duration = "02:34",
                Rate = 6.8f,
                Poster = "Indiana-jones-and-the-dial-of-destiny.jpg",
                Genres = "Action|Adventure"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Meg 2: The Trench",
                Synopsis = "A research team encounters multiple threats while exploring the depths of the ocean, including a malevolent mining operation.",
                Year = 2023,
                Duration = "01:56",
                Rate = 5.5f,
                Poster = "Meg-2-the-trench.jpg",
                Genres = "Action|Adventure|Horror"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "The Last Voyage of the Demeter",
                Synopsis = "A crew sailing from Carpathia to England find that they are carrying very dangerous cargo.",
                Year = 2023,
                Duration = "01:58",
                Rate = 6.5f,
                Poster = "The-last-voyage-of-the-demeter.jpg",
                Genres = "Horror"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Haunted Mansion",
                Synopsis = "A single mom named Gabbie hires a tour guide, a psychic, a priest, and a historian to help exorcise her newly bought mansion after discovering it is inhabited by ghosts.",
                Year = 2023,
                Duration = "02:03",
                Rate = 6.2f,
                Poster = "Haunted-mansion.jpg",
                Genres = "Comedy|Drama|Family"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Talk to Me",
                Synopsis = "When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.",
                Year = 2023,
                Duration = "01:35",
                Rate = 7.5f,
                Poster = "Talk-to-me.jpg",
                Genres = "Horror|Thriller"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Sound of Freedom",
                Synopsis = "The story of Tim Ballard, a former US government agent who quits his job in order to devote his life to rescuing children from global sex traffickers.",
                Year = 2020,
                Duration = "02:11",
                Rate = 7.8f,
                Poster = "Sound-of-freedom.jpg",
                Genres = "Action|Drama|Thriller"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Jules",
                Synopsis = "Milton lives a quiet life of routine in a small western Pennsylvania town, but finds his day upended when a UFO and its extra-terrestrial passenger crash land in his backyard.",
                Year = 2023,
                Duration = "01:27",
                Rate = 7.3f,
                Poster = "Jules.jpg",
                Genres = "Drama"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Elemental",
                Synopsis = "Follows Ember and Wade, in a city where fire-, water-, land- and air-residents live together.",
                Year = 2023,
                Duration = "01:41",
                Rate = 7.0f,
                Poster = "Elemental.jpg",
                Genres = "Animation|Adventure|Comedy"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Black Panther: Wakanda Forever",
                Synopsis = "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King TChalla.",
                Year = 2022,
                Duration = "02:41",
                Rate = 6.7f,
                Poster = "Black-panther-wakanda-forever.jpg",
                Genres = "Adventure|Action|Drama"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Ant-Man and the Wasp: Quantumania",
                Synopsis = "Scott Lang and Hope Van Dyne are dragged into the Quantum Realm, along with Hope's parents and Scotts daughter Cassie. Together they must find a way to escape, but what secrets is Hopes mother hiding? And who is the mysterious Kang?",
                Year = 2023,
                Duration = "02:04",
                Rate = 6.1f,
                Poster = "Ant-man-and-the-wasp-quantumania.png",
                Genres = "Action|Adventure|Comedy"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "The Matrix",
                Synopsis = "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
                Year = 1999,
                Duration = "02:16",
                Rate = 8.7f,
                Poster = "The-Matrix.jpg",
                Genres = "Action|Sci-Fi"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Transformers: Rise of the Beasts",
                Synopsis = "During the 90s, a new faction of Transformers - the Maximals - join the Autobots as allies in the battle for Earth.",
                Year = 2023,
                Duration = "02:07",
                Rate = 6.1f,
                Poster = "Transformers-rise-of-the-beasts.jpg",
                Genres = "Action|Adventure|Sci-Fi"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "The Super Mario Bros. Movie",
                Synopsis = "The story of The Super Mario Bros. on their journey through the Mushroom Kingdom.",
                Year = 2023,
                Duration = "01:32",
                Rate = 7.1f,
                Poster = "The-super-mario-bros-movie.jpg",
                Genres = "Animation|Adventure|Comedy"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "The Little Mermaid",
                Synopsis = "A young mermaid makes a deal with a sea witch to trade her beautiful voice for human legs so she can discover the world above water and impress a prince.",
                Year = 2023,
                Duration = "02:15",
                Rate = 7.2f,
                Poster = "The-little-mermaid.jpg",
                Genres = "Adventure|Family|Fantasy"
            });
            movies.Add(new Movie()
            {
                Id = movies.Count + 1,
                Title = "Titanic",
                Synopsis = "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
                Year = 1997,
                Duration = "03:14",
                Rate = 7.9f,
                Poster = "Titanic.jpg",
                Genres = "Drama|Romance"
            });

            return movies;
        }
    }
}