namespace WebDev.Api.Context
{
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using WebDev.Model;

    public class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
