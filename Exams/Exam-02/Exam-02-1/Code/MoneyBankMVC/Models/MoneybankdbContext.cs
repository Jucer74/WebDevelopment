using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MoneyBankMVC.Models;

public partial class MoneybankdbContext : DbContext
{
    public MoneybankdbContext()
    {
    }

    public MoneybankdbContext(DbContextOptions<MoneybankdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
    }
        
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("accounts");

            entity.Property(e => e.AccountNumber).HasMaxLength(10);
            entity.Property(e => e.AccountType).HasMaxLength(1);
            entity.Property(e => e.BalanceAmount).HasPrecision(18, 2);
            entity.Property(e => e.CreationDate).HasColumnType("datetime");
            entity.Property(e => e.OverdraftAmount).HasPrecision(18, 2);
            entity.Property(e => e.OwnerName).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    internal Task<string?> ByPage(int page, int limit)
    {
        throw new NotImplementedException();
    }

    internal Task<List<Account>> GetAll()
    {
        throw new NotImplementedException();
    }

    internal Task<string?> GetById(int id)
    {
        throw new NotImplementedException();
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
