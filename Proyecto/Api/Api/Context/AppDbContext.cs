using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Context
{
    public class AppDbContext : DbContext
    {

        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Libro> Libros { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Libro>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("libros");

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
                entity.Property(e => e.UserEmail).HasMaxLength(300);

                entity.HasMany(d => d.Libros).WithMany(p => p.Users)
                    .UsingEntity<Dictionary<string, object>>(
                        "reservas",
                        r => r.HasOne<Libro>().WithMany()
                            .HasForeignKey("Libros_Id")
                            .OnDelete(DeleteBehavior.ClientSetNull)
                            .HasConstraintName("reservas_ibfk_2"),
                        l => l.HasOne<User>().WithMany()
                            .HasForeignKey("User_Id")
                            .OnDelete(DeleteBehavior.ClientSetNull)
                            .HasConstraintName("reservas_ibfk_1"),
                        j =>
                        {
                            j.HasKey("User_Id", "Libros_Id").HasName("PRIMARY");
                            j.ToTable("Reservas");
                            j.HasIndex(new[] { "Libros_Id" }, "Libros_Id");
                        });
            });
        }

    }
}
