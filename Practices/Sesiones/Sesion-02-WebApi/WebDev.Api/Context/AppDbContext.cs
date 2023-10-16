﻿namespace WebDev.Api.Context
{
    using Microsoft.EntityFrameworkCore;
    using WebDev.Api.Models;

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