using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Models;
using System.Reflection.Emit;

namespace MoneyBankMVC.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Account> Accounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>()
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();
        }


    }
}
