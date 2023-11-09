using Pizzeria.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Pizzeria.Infrastructure.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Pizzerias> Pizzas { get; set; }

    }
}
