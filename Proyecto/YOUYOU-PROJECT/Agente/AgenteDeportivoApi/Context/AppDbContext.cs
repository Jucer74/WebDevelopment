using AgenteDeportivoApi.Models;
using AgentesDeportivos.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Xml;

namespace AgenteDeportivoApi.Context;

public class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<SportAgent> AgenteDeportivo { get; set; }
    public DbSet<TipoAgenteDeportivo> Agente { get; set; }
}