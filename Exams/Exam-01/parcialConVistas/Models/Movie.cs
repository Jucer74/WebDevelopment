using System.ComponentModel.DataAnnotations;

namespace MovieRank.Models;

public class Movie
{
    [Key] public int Id { get; set; }

    [Required(ErrorMessage = "Title is required")]
    [StringLength(50)]
    public string Title { get; set; } = null!;

    [Required(ErrorMessage = "A Synopsis is required")]
    [StringLength(300)]
    public string Synopsis { get; set; } = null!;

    [Required(ErrorMessage = "Release year is required")]
    public int Year { get; set; }

    [Required(ErrorMessage = "The duration is required")]
    [StringLength(5)]
    // Format hh:mi
    public string Duration { get; set; } = null!;

    // [Required(ErrorMessage = "Rating should not be empty.")]
    // Format 0.0
    [Range(0,10, ErrorMessage=" Rating must be in range.")]
    [DisplayFormat(DataFormatString = "{0:#.#}", ApplyFormatInEditMode = true)] // este es step -.1
    public double Rate { get; set; }

    [Required(ErrorMessage = "A poster is required.")]
    [StringLength(80)]
    // Include only ImageName.ext
    public string Poster { get; set; } = null!;

    // Optional List separated with pipe (|) ej: Action|Adventure|Sci-fi
    public string Genres { get; set; } = null!;
    

}