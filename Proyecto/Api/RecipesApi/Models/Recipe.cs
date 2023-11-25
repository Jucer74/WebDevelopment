using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipesApi.Models;

public class Recipe
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = null!;

    [Required]
    public string Ingredients { get; set; } = null!;

    [Required]
    public string Difficulty{ get; set; } = null!;

    [Required]
    public string EstimatedTime { get; set; } = null!;

    [ForeignKey("CategoryId")]
    public int CategoryId { get; set; }

    public Category Category { get; set; } = null!;
}