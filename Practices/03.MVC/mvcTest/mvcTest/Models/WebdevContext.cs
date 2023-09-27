using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using mvcTest.Models;

namespace mvcTest.Models;

public partial class WebdevContext : DbContext
{
    public WebdevContext()
    {
    }

    public WebdevContext(DbContextOptions<WebdevContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Person> Persons { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Person>(entity =>
        {
            entity.HasKey(e => e.PersonId).HasName("PRIMARY");

            entity.ToTable("persons");

            entity.Property(e => e.PersonId).HasColumnName("PersonID");
            entity.Property(e => e.DateOfBirth).HasColumnType("date");
            entity.Property(e => e.FirstName).HasMaxLength(255);
            entity.Property(e => e.LastName).HasMaxLength(255);
            entity.Property(e => e.Sex)
                .HasMaxLength(1)
                .IsFixedLength();
        });

    }


    public DbSet<mvcTest.Models.Student> Student { get; set; } = default!;
}
