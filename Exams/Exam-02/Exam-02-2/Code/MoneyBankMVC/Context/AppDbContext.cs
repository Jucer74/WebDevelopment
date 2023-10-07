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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("accounts");

                entity.Property(e => e.AccountNumber).HasMaxLength(10);
                entity.Property(e => e.AccountType).HasMaxLength(1);
                entity.Property(e => e.CreationDate).HasColumnType("datetime");
                entity.Property(e => e.OwnerName).HasMaxLength(100);
            });
        }
    }
}
