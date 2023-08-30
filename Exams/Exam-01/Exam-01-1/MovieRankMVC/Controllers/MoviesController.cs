using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using MovieRankMVC.Models;

namespace MovieRankMVC.Controllers
{
    public class MoviesController : Controller
    {
        //Global variables

        private static List<Movie> moviesList = LoadMovies();

    

        // GET: MoviesController
        public ActionResult Index()
        {
            return View(moviesList);
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
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                int id = moviesList.Count() + 1;
                string Title = collection["Title"];
                string Synopsis = collection["Synopsis"];
                int Year = int.Parse(collection["Year"]);
                string Duration = collection["Duration"];
                float Rate = float.Parse(collection["Rate"]);
                string Poster = collection["Poster"];
                string Genres = collection["Genres"];

                moviesList.Add(new Movie() { Id =id, Title = Title, Synopsis = Synopsis, Year = Year, Duration = Duration, Rate = Rate, Poster = Poster, Genres = Genres });
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
            Movie movieToEdit = moviesList.FirstOrDefault(m => m.Id == id);
            return View(movieToEdit);
        }

        // POST: MoviesController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // Encontrar la película en la lista según el ID
                Movie movieToUpdate = moviesList.FirstOrDefault(m => m.Id == id);

                if (movieToUpdate != null)
                {
                    // Actualizar las propiedades de la película con los valores del formulario
                    movieToUpdate.Title = collection["Title"];
                    movieToUpdate.Synopsis = collection["Synopsis"];
                    movieToUpdate.Year = int.Parse(collection["Year"]);
                    movieToUpdate.Duration = collection["Duration"];
                    movieToUpdate.Rate = float.Parse(collection["Rate"]);
                    movieToUpdate.Poster = collection["Poster"];
                    movieToUpdate.Genres = collection["Genres"];

                    // Redirigir a la acción Index después de la actualización exitosa
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    // La película no se encontró, redirige a una página de error o maneja la situación
                    return NotFound();
                }
            }
            catch
            {
                return View();
            }
        }

        // GET: MoviesController/Delete/5
        public ActionResult Delete(int id)
        {
            Movie movieToDelete = moviesList.FirstOrDefault(m => m.Id == id);

            return View(movieToDelete);
        }

        // POST: MoviesController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            Movie movieToDelete = moviesList.FirstOrDefault(m => m.Id == id);

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

        #region Private-Methods
        private static List<Movie> LoadMovies() 
        {
            List<Movie> movies = new List<Movie>();

            movies.Add(new Movie { Id = 1, Title = "Barbie", Year = 2023, Duration = "1:54", Synopsis = "Barbie suffers a crisis that leads her to question her world and her existence.", Genres = "Comedy|Adventure|Fantasy", Rate = 7.4f, Poster = "~/Posters/Barbie.jpg" });
            movies.Add(new Movie { Id = 2, Title = "Oppenheimer", Year = 2023, Duration = "3:00", Synopsis = "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.", Genres = "Biography|Drama|History", Rate = 8.6f, Poster = "~/Posters/Oppenheimer.jpg" });
            movies.Add(new Movie { Id = 3, Title = "Guardians of the Galaxy Vol. 3", Year = 2023, Duration = "2:30", Synopsis = "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own - a mission that could mean the end of the Guardians if not successful.", Genres = "Action|Adventure|Comedy", Rate = 8.0f, Poster = "~/Posters/Guardians-of-the-galaxy-vol-3.jpg" });
            movies.Add(new Movie { Id = 4, Title = "Blue Beetle", Year = 2023, Duration = "2:07", Synopsis = "A Mexican teenager finds an alien beetle that gives him superpowered armor.", Genres = "Action|Adventure|Sci-Fi", Rate = 6.8f, Poster = "~/Posters/Blue-beetle.jpg" });
            movies.Add(new Movie { Id = 5, Title = "Interstellar", Year = 2014, Duration = "2:49", Synopsis = "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", Genres = "Adventure|Drama|Sci-Fi", Rate = 8.7f, Poster = "~/Posters/Interstellar.jpg" });
            movies.Add(new Movie { Id = 6, Title = "Avengers: Age of Ultron", Year = 2015, Duration = "2:21", Synopsis = "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.", Genres = "Action|Adventure|Sci-Fi", Rate = 7.3f, Poster = "~/Posters/Avengers-Age-of-Ultron.jpg" });
            movies.Add(new Movie { Id = 7, Title = "Spider-Man: Across the Spider-Verse", Year = 2023, Duration = "2:20", Synopsis = "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.", Genres = "Animation|Action|Adventure", Rate = 8.8f, Poster = "~/Posters/Spider-man-across-the-spider-verse-part-one.jpg" });
            movies.Add(new Movie { Id = 8, Title = "Mission: Impossible - Dead Reckoning Part One", Year = 2023, Duration = "2:43", Synopsis = "Ethan Hunt and his IMF team must track down a dangerous weapon before it falls into the wrong hands.", Genres = "Action|Adventure|Thriller", Rate = 8.0f, Poster = "~/Posters/Mission-impossible-dead-reckoning-part-one.jpg" });
            movies.Add(new Movie { Id = 9, Title = "Teenage Mutant Ninja Turtles: Mutant Mayhem", Year = 2023, Duration = "1:39", Synopsis = "The film follows the Turtle brothers as they work to earn the love of New York City while facing down an army of mutants.", Genres = "Animation|Action|Adventure", Rate = 7.5f, Poster = "~/Posters/Teenage-mutant-ninja-turtles-mutant-mayhem.jpg" });
            movies.Add(new Movie { Id = 10, Title = "Top Gun: Maverick", Year = 2022, Duration = "2:10", Synopsis = "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice from those chosen to fly it.", Genres = "Drama|Action", Rate = 8.3f, Poster = "~/Posters/Top-Gun-Maverick.jpg" });
            movies.Add(new Movie { Id = 11, Title = "Avengers: Endgame", Year = 2019, Duration = "3:01", Synopsis = "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.", Genres = "Action|Adventure|Sci-Fi", Rate = 8.4f, Poster = "~/Posters/Avengers-Endgame.jpg" });
            movies.Add(new Movie { Id = 12, Title = "Indiana Jones and the Dial of Destiny", Year = 2023, Duration = "2:34", Synopsis = "Archaeologist Indiana Jones races against time to retrieve a legendary artifact that can change the course of history.", Genres = "Action|Adventure", Rate = 6.8f, Poster = "~/Posters/Indiana-jones-and-the-dial-of-destiny.jpg" });
            movies.Add(new Movie { Id = 13, Title = "Meg 2: The Trench", Year = 2023, Duration = "1:56", Synopsis = "A research team encounters multiple threats while exploring the depths of the ocean, including a malevolent mining operation.", Genres = "Action|Adventure|Horror", Rate = 5.5f, Poster = "~/Posters/Meg-2-the-trench.jpg" });
            movies.Add(new Movie { Id = 14, Title = "The Last Voyage of the Demeter", Year = 2023, Duration = "1:58", Synopsis = "A crew sailing from Carpathia to England find that they are carrying very dangerous cargo.", Genres = "Horror", Rate = 6.5f, Poster = "~/Posters/The-last-voyage-of-the-demeter.jpg" });
            movies.Add(new Movie { Id = 15, Title = "Haunted Mansion", Year = 2023, Duration = "2:03", Synopsis = "A single mom named Gabbie hires a tour guide, a psychic, a priest, and a historian to help exorcise her newly bought mansion after discovering it is inhabited by ghosts.", Genres = "Comedy|Drama|Family", Rate = 6.2f, Poster = "~/Posters/Haunted-mansion.jpg" });
            movies.Add(new Movie { Id = 16, Title = "Talk to Me", Year = 2023, Duration = "1:35", Synopsis = "When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.", Genres = "Horror|Thriller", Rate = 7.5f, Poster = "~/Posters/Talk-to-me.jpg" });
            movies.Add(new Movie { Id = 17, Title = "Sound of Freedom", Year = 2020, Duration = "2:11", Synopsis = "The story of Tim Ballard, a former US government agent who quits his job in order to devote his life to rescuing children from global sex traffickers.", Genres = "Action|Drama|Thriller", Rate = 7.8f, Poster = "~/Posters/Sound-of-freedom.jpg" });
            movies.Add(new Movie { Id = 18, Title = "Jules", Year = 2023, Duration = "1:27", Synopsis = "Milton lives a quiet life of routine in a small western Pennsylvania town, but finds his day upended when a UFO and its extra-terrestrial passenger crash land in his backyard.", Genres = "Drama", Rate = 7.3f, Poster = "~/Posters/Jules.jpg" });
            movies.Add(new Movie { Id = 19, Title = "Elemental", Year = 2023, Duration = "1:41", Synopsis = "Follows Ember and Wade, in a city where fire-, water-, land- and air-residents live together.", Genres = "Animation|Adventure|Comedy", Rate = 7.0f, Poster = "~/Posters/Elemental.jpg" });
            movies.Add(new Movie { Id = 20, Title = "Black Panther: Wakanda Forever", Year = 2022, Duration = "2:41", Synopsis = "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King TChalla.", Genres = "Adventure|Action|Drama", Rate = 6.7f, Poster = "~/Posters/Black-panther-wakanda-forever.jpg" });
            movies.Add(new Movie { Id = 21, Title = "Ant-Man and the Wasp: Quantumania", Year = 2023, Duration = "2:04", Synopsis = "Scott Lang and Hope Van Dyne are dragged into the Quantum Realm, along with Hope's parents and Scott's daughter Cassie. Together they must find a way to escape, but what secrets is Hope's mother hiding? And who is the mysterious Kang?", Genres = "Action|Adventure|Comedy", Rate = 6.1f, Poster = "~/Posters/Ant-man-and-the-wasp-quantumania.png" });
            movies.Add(new Movie { Id = 22, Title = "The Matrix", Year = 1999, Duration = "2:16", Synopsis = "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.", Genres = "Action|Sci-Fi", Rate = 8.7f, Poster = "~/Posters/The-Matrix.jpg" });
            movies.Add(new Movie { Id = 23, Title = "Transformers: Rise of the Beasts", Year = 2023, Duration = "2:07", Synopsis = "During the 90s, a new faction of Transformers - the Maximals - join the Autobots as allies in the battle for Earth.", Genres = "Action|Adventure|Sci-Fi", Rate = 6.1f, Poster = "~/Posters/Transformers-rise-of-the-beasts.jpg" });
            movies.Add(new Movie { Id = 24, Title = "The Super Mario Bros. Movie", Year = 2023, Duration = "1:32", Synopsis = "The story of The Super Mario Bros. on their journey through the Mushroom Kingdom.", Genres = "Animation|Adventure|Comedy", Rate = 7.1f, Poster = "~/Posters/The-super-mario-bros-movie.jpg" });
            movies.Add(new Movie { Id = 25, Title = "The Little Mermaid", Year = 2023, Duration = "2:15", Synopsis = "A young mermaid makes a deal with a sea witch to trade her beautiful voice for human legs so she can discover the world above water and impress a prince.", Genres = "Adventure|Family|Fantasy", Rate = 7.2f, Poster = "~/Posters/The-little-mermaid.jpg" });
            movies.Add(new Movie { Id = 26, Title = "Titanic", Year = 1997, Duration = "3:14", Synopsis = "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.", Genres = "Drama|Romance", Rate = 7.9f, Poster = "~/Posters/Titanic.jpg" });
            movies.Add(new Movie { Id = 27, Title = "Spider-Man", Year = 2002, Duration = "2:01", Synopsis = "After being bitten by a genetically-modified spider, a shy teenager gains spider-like abilities that he uses to fight injustice as a masked superhero and face a vengeful enemy.", Genres = "Action|Adventure|Sci-Fi", Rate = 7.4f, Poster = "~/Posters/Spider-Man.jpg" });
            movies.Add(new Movie { Id = 28, Title = "Batman: The Dark Knight", Year = 2008, Duration = "2:32", Synopsis = "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", Genres = "Action|Crime|Drama", Rate = 9.0f, Poster = "~/Posters/Batman-the-dark-knight.jpg" });
            movies.Add(new Movie { Id = 29, Title = "Captain America: The First Avenger", Year = 2011, Duration = "2:04", Synopsis = "Steve Rogers, a rejected military soldier transforms into Captain America after taking a dose of a Super-Soldier serum. But being Captain America comes at a price as he attempts to take down a war monger and a terrorist organization.", Genres = "Action|Adventure|Sci-Fi", Rate = 6.9f, Poster = "~/Posters/Captain-America-The-First-Avenger.jpg" });
            movies.Add(new Movie { Id = 30, Title = "The Lord of the Rings: The Two Towers", Year = 2002, Duration = "2:59", Synopsis = "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.", Genres = "Adventure|Action|Drama", Rate = 8.8f, Poster = "~/Posters/The-Lord-of-the-Rings-The-Two-Towers.jpg" });

            return movies;
        }
        #endregion Private-Methods
    }
}
