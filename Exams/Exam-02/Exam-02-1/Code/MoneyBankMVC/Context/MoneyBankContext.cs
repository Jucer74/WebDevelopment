using Microsoft.EntityFrameworkCore;

namespace MoneyBankMVC.Models
{
    public class MoneyBankContext : DbContext
    {
        public MoneyBankContext(DbContextOptions<MoneyBankContext> options) : base(options)
        {
        }

        public DbSet<Account> Accounts { get; set; }
    }
}
