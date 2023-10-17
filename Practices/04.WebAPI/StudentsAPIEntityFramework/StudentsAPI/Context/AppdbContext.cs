using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using StudentsAPI.Model;

namespace StudentsAPI.Context;

public partial class AppdbContext : DbContext
{
    public AppdbContext()
    {
    }

    public AppdbContext(DbContextOptions<AppdbContext> options): base(options)
    {
    }

    public virtual DbSet<Student> Students { get; set; }
}
