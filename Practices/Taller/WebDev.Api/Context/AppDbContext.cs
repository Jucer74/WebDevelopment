using Microsoft.EntityFrameworkCore;
using WebDev.Api.Model;

namespace WebDev.Api.Context
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; }
    }
}