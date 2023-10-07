using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Models;

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

    }
}

