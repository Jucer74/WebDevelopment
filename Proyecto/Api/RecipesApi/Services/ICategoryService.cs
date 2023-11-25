using RecipesApi.Models;

namespace RecipesApi.Services;

public interface ICategoryService
{
    Task<Category> CreateCategory(Category category);

    Task DeleteCategory(int id);

    Task<List<Category>> GetAllCategories();

    Task<Category> GetCategoryById(int id);

    Task<Category> UpdateCategory(int id, Category category);

    Task<List<Recipe>> GetRecipesByCategoryId(int id);
}