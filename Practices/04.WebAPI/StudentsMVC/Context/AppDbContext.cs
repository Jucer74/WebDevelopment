using Microsoft.EntityFrameworkCore;
using StudentsMVC.Models;

namespace StudentsMVC.Context
{
    public class AppDbContext:DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
    }
}
