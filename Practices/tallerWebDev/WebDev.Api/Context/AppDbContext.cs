using Microsoft.EntityFrameworkCore;
using WebDev.Api.Model;
using Microsoft.Extensions.Configuration;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace WebDev.Api.Context
{
    public partial class AppDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public AppDbContext(DbContextOptions<AppDbContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var connectionString = _configuration.GetConnectionString("MySqlConnection");
                optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 27)));
            }
        }
    }
}
