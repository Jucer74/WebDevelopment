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
    // Format hh:mi
    public string Duration { get; set; } = null!;

    [Required(ErrorMessage = "The Rate is required")]
    // Format 0.0
    public float Rate { get; set; }

    [Required(ErrorMessage = "The Title is required")]
    [StringLength(50)]
    // Include only ImageName.ext
    public string Poster { get; set; } = null!;

    // Optional List separated with pipe (|) ej: Action|Adventure|Sci-fi
    public string Genres { get; set; } = null!;

}