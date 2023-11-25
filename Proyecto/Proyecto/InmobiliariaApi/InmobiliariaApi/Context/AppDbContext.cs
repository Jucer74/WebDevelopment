using InmobiliariaApi.Models;
using Microsoft.EntityFrameworkCore;

namespace InmobiliariaApi.Context;

public class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<RealEstate> realestate { get; set; }
    public DbSet<RealEstateCategory> realestatecategory { get; set; }


}
