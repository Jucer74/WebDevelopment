using MoneyBankMVC.Models;
using Microsoft.EntityFrameworkCore;

namespace MoneyBankMVC.Context;

public class MoneyBankContext : DbContext
{
    public MoneyBankContext(DbContextOptions<MoneyBankContext> options) : base(options)
    {
    }
    public DbSet<Account> Accounts { get; set; } = null!;
}