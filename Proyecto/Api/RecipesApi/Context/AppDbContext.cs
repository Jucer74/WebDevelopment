using Microsoft.EntityFrameworkCore;
using RecipesApi.Models;

namespace RecipesApi.Context;

public class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Category> Categories { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
}