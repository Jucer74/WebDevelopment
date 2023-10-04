namespace WebDev.Api.Context
{
    using System;
    using Microsoft.EntityFrameworkCore;
    using Model;

    public class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Concept> Concepts { get; set; }
    }
}