using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace CitasMedicasApi.Models
{
    public partial class CitasMedicasBdContext : DbContext
    {
        public CitasMedicasBdContext()
        {
        }

        public CitasMedicasBdContext(DbContextOptions<CitasMedicasBdContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Especializacion> Especializaciones { get; set; }
        public virtual DbSet<Medico> Medicos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Especializacion>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");
                entity.ToTable("especializacion");
                entity.Property(e => e.Name).HasMaxLength(300);
            });

            modelBuilder.Entity<Medico>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PRIMARY");
                entity.ToTable("medicos");
                entity.Property(e => e.FirstName).HasMaxLength(50);
                entity.Property(e => e.LastName).HasMaxLength(50);
                entity.Property(e => e.Password).HasMaxLength(50);
                entity.Property(e => e.UserEmail).HasMaxLength(300);

                // Relación muchos a muchos entre Medico y Especializacion
                entity.HasMany(m => m.Especializaciones)
                    .WithMany(e => e.Medicos)
                    .UsingEntity<Dictionary<string, object>>(
                        "MedicoEspecializacion",
                        j => j
                            .HasOne<Especializacion>()
                            .WithMany()
                            .HasForeignKey("EspecializacionId")
                            .OnDelete(DeleteBehavior.ClientSetNull),
                        j => j
                            .HasOne<Medico>()
                            .WithMany()
                            .HasForeignKey("MedicoId")
                            .OnDelete(DeleteBehavior.ClientSetNull),
                        j =>
                        {
                            j.HasKey("MedicoId", "EspecializacionId");
                            j.ToTable("MedicoEspecializacion");
                        }
                    );
            });
        }
    }
}
