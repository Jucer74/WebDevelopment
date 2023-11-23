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
        public virtual DbSet<Agent> Agents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Agent>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.ToTable("agents");

                entity.Property(e => e.AgentEmail).HasMaxLength(300);
                entity.Property(e => e.AgentName).HasMaxLength(50);
                entity.Property(e => e.AgentLasName).HasMaxLength(50);
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
                    .HasColumnType("enum('cliente','agente')");
                entity.Property(e => e.UserEmail).HasMaxLength(300);

                entity.HasMany(d => d.Agents).WithMany(p => p.Users)
                    .UsingEntity<Dictionary<string, object>>(
                        "sesions",
                        r => r.HasOne<Agent>().WithMany()
                            .HasForeignKey("Agent_Id")
                            .OnDelete(DeleteBehavior.ClientSetNull)
                            .HasConstraintName("sesions_ibfk_2"),
                        l => l.HasOne<User>().WithMany()
                            .HasForeignKey("User_Id")
                            .OnDelete(DeleteBehavior.ClientSetNull)
                            .HasConstraintName("sesions_ibfk_1"),
                        j =>
                        {
                            j.HasKey("User_Id", "Agent_Id").HasName("PRIMARY");
                            j.ToTable("sesions");
                            j.HasIndex(new[] { "Agent_Id" }, "Agent_Id");
                        });
            });
        }

    }
}
