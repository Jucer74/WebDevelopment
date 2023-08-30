using MovieRank.Models;

namespace MovieRank.Services;

public class MovieService
{
    private static List<Movie>? _movies = LoadMovies();

    private static List<Movie>? LoadMovies()
    {
        // Create a list of movies
            List<Movie>? movies = new List<Movie>();

            // Add movies to the list
            movies.Add(new Movie
            {
                Id = 1,
                Title = "Avengers",
                Synopsis =
                    "The head of the SHIELD Agency decides to recruit a team to save the world from near-certain disaster when an enemy unexpectedly emerges as a major threat to global security.",
                Year = 2012,
                Duration = "2H:22M",
                Rate = 8.6,
                Poster = "/Public/Img/ImgMovie/avengers.jpeg",
                Genres = "Action,Aventure"
            });
            movies.Add(new Movie
            {
                Id = 2,
                Title = "Avengers End Game",
                Synopsis =
                    "The remaining Avengers must find a way to win back their allies for an epic showdown with Thanos, the villain who decimated the planet and the universe.",
                Year = 2019,
                Duration = "3H:2M",
                Rate = 9.0,
                Poster = "/Public/Img/ImgMovie/avengers-end-game.jpeg",
                Genres = "Action,Ciencie Fiction"
            });
            movies.Add(new Movie
            {
                Id = 3,
                Title = "Relentless Pursuit 3",
                Synopsis =
                    "After being framed for the death of his beloved ex-wife, ex-undercover officer Bryan Mills channels his anger and particular skills to exact revenge on the real killers and protect his daughter.",
                Year = 2014,
                Duration = "1H:49M",
                Rate = 8.0,
                Poster = "/Public/Img/ImgMovie/relentless-pursuit-3.jpeg",
                Genres = "Action"
            });
            movies.Add(new Movie
            {
                Id = 4,
                Title = "They Are Like Children",
                Synopsis =
                    "A group of friends and former teammates discover that getting old doesn't always mean growing up when they come together to honor the memory of their basketball coach.",
                Year = 2010,
                Duration = "1H:42M",
                Rate = 7.6,
                Poster = "/Public/Img/ImgMovie/they-are-like-children.jpeg",
                Genres = "Comedy"
            });
            movies.Add(new Movie
            {
                Id = 5,
                Title = "Wreck Ralph",
                Synopsis =
                    "After years of losing to his adversary, Ralph, an arcade game character, tires of being the bad guy and takes matters into his own hands to finally become a hero, but a deadly enemy is unleashed.",
                Year = 2012,
                Duration = "1H:48M",
                Rate = 3.9,
                Poster = "/Public/Img/ImgMovie/wreck-ralph.jpeg",
                Genres = "Animation|Adventure|Children"
            });
            movies.Add(new Movie {
                Id = 6,
                Title = "The Specialist",
                Synopsis = "A woman entices a bomb expert she's involved with into destroying the mafia that killed her family.",
                Year = 1994,
                Duration = "1H:50M",
                Rate = 6.7,
                Poster = "https://m.media-amazon.com/images/M/MV5BYjMwZDMwZTItMTc2MC00NDRlLWI3YmUtNTg0ZmQ3MzdhNDJmXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SY1000_SX677_AL_.jpg",
                Genres = "Action|Crime|Drama"
            });
            movies.Add(new Movie {
                Id = 7,
                Title = "Dance Me Outside",
                Synopsis = "A story of life on an Indian reservation in Ontario: Silas and Frank are trying to get into college to train to be mechanics but they find themselves having to deal with girls, family ... and murder.",
                Year = 1994,
                Duration = "1H:24M",
                Rate = 7.3,
                Poster = "https://m.media-amazon.com/images/M/MV5BNjQ0NTU4NjI5OV5BMl5BanBnXkFtZTYwMzE0MTg4._V1_SY1000_SX677_AL_.jpg",
                Genres = "Comedy|Drama"
            });
            movies.Add(new Movie {
                Id = 8,
                Title = "Mary Shelley's Frankenstein",
                Synopsis = "When the brilliant but unorthodox scientist Victor Frankenstein rejects the artificial man that he has created, the Creature escapes and later swears revenge.",
                Year = 1994,
                Duration = "2H:03M",
                Rate = 6.4,
                Poster = "https://m.media-amazon.com/images/M/MV5BOWNjMGQ2NTYtNWZlMS00Nzk4LWE5ZDQtNWFhZDk0ZWM3ODc4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_SX677_AL_.jpg",
                Genres = "Drama|Horror|Romance"
            });
            movies.Add(new Movie {
                Id = 9,
                Title = "Pulp Fiction",
                Synopsis = "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
                Year = 1994,
                Duration = "2H:34M",
                Rate = 8.9,
                Poster = "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg",
                Genres = "Crime|Drama"
            });
            movies.Add(new Movie
            {
                Id = 11,
                Title = "Se7en",
                Synopsis =
                    "A film about two homicide detectives' desperate hunt for a serial killer who justifies his crimes as absolution for the world's ignorance of the Seven Deadly Sins.",
                Year = 1995,
                Duration = "2H:07M",
                Rate = 8.6,
                Poster =
                    "https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_SX677_AL_.jpg",
                Genres = "Drama|Mystery|Thriller"
            });
            
            movies.Add(new Movie {
                Id = 12,
                Title = "The Lord of the Rings: The Fellowship of the Ring",
                Synopsis = "An ancient Ring thought lost for centuries has been found, and through a strange twist in fate has been given to a small Hobbit named Frodo.",
                Year = 2001,
                Duration = "2H58M",
                Rate = 8.8,
                Poster = "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY1000_SX677_AL_.jpg",
                Genres = "Adventure|Fantasy"
            });
            
            movies.Add(new Movie {
                Id = 13,
                Title = "The Lord of the Rings: The Two Towers",
                Synopsis = "While Frodo and Sam, now accompanied by a new guide, continue their hopeless journey towards the land of shadow to destroy the One Ring.",
                Year = 2002,
                Duration = "2H59M",
                Rate = 8.7,
                Poster = "https://m.media-amazon.com/images/M/MV5BNGE5MzIyNTAtNWFlMC00NDA2LWJiMjItMjc4Yjg1OWM5NzhhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg",
                Genres = "Adventure|Fantasy"
            });
            
            movies.Add(new Movie {
                Id = 14,
                Title = "The Lord of the Rings: The Return of the King",
                Synopsis = "While Frodo & Sam continue to approach Mount Doom to destroy the One Ring, Gandalf and Aragorn lead the World of Men against Sauron's army.",
                Year = 2003,
                Duration = "3H21M",
                Rate = 8.9,
                Poster = "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg",
                Genres = "Adventure|Fantasy"
            });
            
            return movies;
    }

    public List<Movie>? GetMovies()
    {
        return _movies;
    }
}