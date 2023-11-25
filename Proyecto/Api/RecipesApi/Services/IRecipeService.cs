using RecipesApi.Models;

namespace RecipesApi.Services;

public interface IRecipeService
{
    Task<Recipe> CreateRecipe(Recipe recipe);

    Task DeleteRecipe(int id);

    Task<List<Recipe>> GetAllRecipes();

    Task<Recipe> GetRecipeById(int id);

    Task<Recipe> UpdateRecipe(int id, Recipe recipe);

}
