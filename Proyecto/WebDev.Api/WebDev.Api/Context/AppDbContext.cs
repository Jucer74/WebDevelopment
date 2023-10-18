namespace WebDev.Api.Context
{
    using Microsoft.EntityFrameworkCore;
    using WebDev.Api.Model;

    public class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // Reemplaza "tu_cadena_de_conexion_mysql" con tu cadena de conexión MySQL.
                optionsBuilder.UseMySql("Server=localhost;Port=3306;Database=UsersDB;User Id=Admin;Password=Admin123;Charset=utf8;MultipleActiveResultSets=true", new MySqlServerVersion(new Version(8, 0, 23)));
            }
        }

        public DbSet<User> Users { get; set; }
    }
}