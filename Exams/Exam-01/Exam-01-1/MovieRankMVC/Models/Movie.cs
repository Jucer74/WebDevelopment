using System.ComponentModel.DataAnnotations;

namespace MovieRankMVC.Models;

public class Movie
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "The Title is required")]
    [StringLength(50)]
    public string Title { get; set; } = null!;

    [Required(ErrorMessage = "The Synopsis is required")]
    [StringLength(300)]
    public string Synopsis { get; set; } = null!;

    [Required(ErrorMessage = "The Year is required")]
    public int Year { get; set; }

    [Required(ErrorMessage = "The Duration is required")]
    [StringLength(5)]
    public string Duration { get; set; } = null!;

    [Required(ErrorMessage = "The Rate is required")]
<<<<<<< HEAD
=======
    // Format 0.0
>>>>>>> origin/2023-02-1/julroburi
    public float Rate { get; set; }

    [StringLength(50)]
    public string Poster { get; set; } = null!;

    // Optional List separated with pipe (|) ej: Action|Adventure|Sci-fi
    public string Genres { get; set; } = null!;
}