using Microsoft.EntityFrameworkCore;
using RecipesApi.Context;
using RecipesApi.Exceptions;
using RecipesApi.Models;

namespace RecipesApi.Services;

public class RecipeService : IRecipeService
{
    private readonly AppDbContext _appDbContext;

    public RecipeService(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }


    public async Task<Recipe> CreateRecipe(Recipe recipe)
    {
        _appDbContext.Set<Recipe>().Add(recipe);
        await _appDbContext.SaveChangesAsync();
        return recipe;
    }

    public async Task DeleteRecipe(int id)
    {
        var original = await _appDbContext.Set<Recipe>().FindAsync(id);

        if (original is null)
        {
            throw new NotFoundException($"Recipe with Id={id} Not Found");
        }

        _appDbContext.Set<Recipe>().Remove(original);
        await _appDbContext.SaveChangesAsync();
    }

    public async Task<List<Recipe>> GetAllRecipes()
    {
        return await _appDbContext.Set<Recipe>().ToListAsync<Recipe>();
    }

    public async Task<Recipe> GetRecipeById(int id)
    {
        var recipe = await _appDbContext.Set<Recipe>().FindAsync(id);
        if (recipe is null)
        {
            throw new NotFoundException($"Recipe with Id={id} Not Found");
        }

        return recipe!;
    }

    public async Task<Recipe> UpdateRecipe(int id, Recipe recipe)
    {
        if (id != recipe.Id)
        {
            throw new BadRequestException($"Id [{id}] is different to Recipe.Id [{recipe.Id}]");
        }

        var original = await _appDbContext.Set<Recipe>().FindAsync(id);

        if (original is null)
        {
            throw new NotFoundException($"Recipe with Id={id} Not Found");
        }

        _appDbContext.Entry(original).CurrentValues.SetValues(recipe!);
        await _appDbContext.SaveChangesAsync();

        return recipe!;
    }
}
