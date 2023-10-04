using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Models;

namespace MoneyBankMVC.Context;

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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {


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

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
