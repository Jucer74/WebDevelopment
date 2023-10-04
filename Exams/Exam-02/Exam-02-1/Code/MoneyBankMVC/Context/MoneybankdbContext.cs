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
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=moneybankdb;user id=moneybankuser;password=M0n3yB4nkUs3r*01", ServerVersion.Parse("8.0.33-mysql"));

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
