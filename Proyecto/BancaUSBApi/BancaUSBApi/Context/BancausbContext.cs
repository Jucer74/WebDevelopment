using BancaUSBApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BancaUSBApi.Context;

public partial class BancausbContext : DbContext
{
    public BancausbContext()
    {
    }

    public BancausbContext(DbContextOptions<BancausbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("products");

            entity.Property(e => e.Name).HasMaxLength(300);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.UserEmail, "UserEmail").IsUnique();

            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.Role)
                .HasDefaultValueSql("'cliente'")
                .HasColumnType("enum('cliente','administrador')");
            entity.Property(e => e.UserEmail).HasMaxLength(300);

            entity.HasMany(d => d.Products).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "Userproduct",
                    r => r.HasOne<Product>().WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("userproducts_ibfk_2"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("userproducts_ibfk_1"),
                    j =>
                    {
                        j.HasKey("UserId", "ProductId").HasName("PRIMARY");
                        j.ToTable("userproducts");
                        j.HasIndex(new[] { "ProductId" }, "ProductId");
                    });
        });
    }
}