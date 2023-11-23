using System;
using System.Collections.Generic;
using CitasMedicasApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CitasMedicasApi;

public partial class CitasMedicasBdContext : DbContext
{
    public CitasMedicasBdContext()
    {
    }

    public CitasMedicasBdContext(DbContextOptions<CitasMedicasBdContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Especializacion> Especializacions { get; set; }

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

            entity.HasIndex(e => e.EspecializacionId, "EspecializacionId");

            entity.HasIndex(e => e.UserEmail, "UserEmail").IsUnique();

            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.UserEmail).HasMaxLength(300);

            entity.HasOne(d => d.Especializacion).WithMany(p => p.Medicos)
                .HasForeignKey(d => d.EspecializacionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("medicos_ibfk_1");
        });

    }
}
