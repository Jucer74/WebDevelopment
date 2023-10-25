using FrontendBmxAspMVC.Models;
using Microsoft.EntityFrameworkCore;

namespace FrontendBmxAspMVC.Context;

public class AppDbContext : DbContext
{
    // Constructor with options
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // Models to be added here
    public DbSet<Bike> Bikes { get; set; }
    public DbSet<User> Users { get; set; }
}