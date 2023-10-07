using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Models;
//using System.Collections.Generic;

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

        public DbSet<MoneyBankMVC.Models.Transaction> Transaction { get; set; } = default!;

        public DbSet<MoneyBankMVC.Models.Transaction> Withdrawal { get; set; } = default!;
    }
}
