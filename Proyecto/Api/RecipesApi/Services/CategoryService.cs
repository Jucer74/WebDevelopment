using Microsoft.EntityFrameworkCore;
using RecipesApi.Context;
using RecipesApi.Exceptions;
using RecipesApi.Models;

namespace RecipesApi.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _appDbContext;

        public CategoryService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Category> CreateCategory(Category category)
        {
            _appDbContext.Set<Category>().Add(category);
            await _appDbContext.SaveChangesAsync();
            return category; 
        }

        public async Task DeleteCategory(int id)
        {
            var original = await _appDbContext.Set<Category>().FindAsync(id);

            if (original is null)
            {
                throw new NotFoundException($"Category with Id={id} Not Found");
            }

            _appDbContext.Set<Category>().Remove(original);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<List<Category>> GetAllCategories()
        {
            return await _appDbContext.Set<Category>().ToListAsync<Category>();
        }

        public async Task<Category> GetCategoryById(int id)
        {
            var category = await _appDbContext.Set<Category>().FindAsync(id);
            if (category is null)
            {
                throw new NotFoundException($"Category with Id={id} Not Found");
            }
            return category!;
        }

        public async Task<List<Recipe>> GetRecipesByCategoryId(int id)
        {
            var recipes = await _appDbContext.Categories
                                    .Include(m => m.Recipes)
                                    .Where(t => t.Id == id)
                                    .FirstOrDefaultAsync();
                                    

            return recipes!.Recipes;
        }

        public async Task<Category> UpdateCategory(int id, Category category)
        {
            if(id != category.Id)
            {
                throw new BadRequestException($"Id [{id}] is different to Category.Id [{category.Id}]");
            }

            var original = await _appDbContext.Set<Category>().FindAsync(id);

            if (original is null)
            {
                throw new NotFoundException($"Category with Id={id} Not Found");
            }

            _appDbContext.Entry(original).CurrentValues.SetValues(category!);
            await _appDbContext.SaveChangesAsync();

            return category!;
        }
    }
}
