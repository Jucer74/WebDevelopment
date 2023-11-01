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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Ajusta la longitud máxima de la columna Password según tus necesidades
            modelBuilder.Entity<User>()
                .Property(u => u.Password)
                .HasMaxLength(60); // Ejemplo: configuración para contraseñas de hasta 60 caracteres
        }
    }
}