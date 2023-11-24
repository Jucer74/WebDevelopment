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
                optionsBuilder.UseMySql("data source=localhost; initial catalog=accountbank; User Id= accountuser; Password= M0n3yB4nkUs3r*01;Charset=utf8; MultipleActiveResultSets=true", new MySqlServerVersion(new Version(8, 0, 23)));
            }
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}