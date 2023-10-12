using WebDev.Api.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;

var builder = WebApplication.CreateBuilder(args);

// Configurar la configuración
builder.Configuration.AddJsonFile("appsettings.json", optional: false);

// Obtener la cadena de conexión
var connectionString = builder.Configuration.GetConnectionString("UsersDB");

// Configurar el DbContext
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

// Otros servicios y configuraciones...

var app = builder.Build();
app.Run();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
