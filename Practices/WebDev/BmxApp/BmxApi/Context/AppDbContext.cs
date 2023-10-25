using BmxApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BmxApi.Context;

public class AppDbContext : DbContext
{
    // Constructor
    public AppDbContext()
    {
    }

    // Constructor with options
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    // Models to be added here
    public DbSet<Bike> Bikes { get; set; }
    public DbSet<User> Users { get; set; }
}