namespace RecipesApi.Dtos;

public class RecipeDto
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Ingredients { get; set; } = null!;
    public string Difficulty{ get; set; } = null!;
    public string EstimatedTime { get; set; } = null!;
    public int CategoryId { get; set; }
}