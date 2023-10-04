using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using mvcTest.Models;

namespace mvcTest.Models;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
    {
    }

    public virtual DbSet<Student> Students { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StudentId).HasName("PRIMARY");

            entity.ToTable("student");

            entity.Property(e => e.StudentId).HasColumnName("StudentId");
            entity.Property(e => e.StudentDateOfBirth).HasColumnType("date");
            entity.Property(e => e.StudentFirstName).HasMaxLength(255);
            entity.Property(e => e.StudentLastName).HasMaxLength(255);
            entity.Property(e => e.StudentSex)
                .HasMaxLength(1)
                .IsFixedLength();
        });
    }

    public DbSet<mvcTest.Models.Student> Student { get; set; } = default!;
}
