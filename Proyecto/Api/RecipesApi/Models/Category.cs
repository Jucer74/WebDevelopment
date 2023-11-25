using System.ComponentModel.DataAnnotations;

namespace RecipesApi.Models;

public class Category
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string CategoryName { get; set; } = null!;

    public virtual List<Recipe> Recipes { get; set; } = null!;
}