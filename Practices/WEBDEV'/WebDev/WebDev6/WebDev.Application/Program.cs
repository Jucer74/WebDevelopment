using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using WebDev.Application.Config;

var builder = WebApplication.CreateBuilder(args);

// Configura la configuración de la aplicación.
builder.Configuration.AddJsonFile("appsettings.json");

// Configura los servicios.
builder.Services.AddControllersWithViews();

// Lee la configuración y la inyecta en el modelo ApiConfiguration.
builder.Services.Configure<ApiConfiguration>(builder.Configuration.GetSection("ApiConfiguration"));

// Agrega la memoria caché distribuida y la sesión
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(1); // Puedes ajustar el tiempo de inactividad según tus necesidades.
});

var app = builder.Build();

// Configura el pipeline de solicitudes HTTP.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // El valor HSTS predeterminado es de 30 días. Puede que desees cambiarlo en escenarios de producción, consulta https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCookiePolicy();
app.UseSession();

app.UseRouting();

app.UseAuthorization();

app.UseSession(); // Agrega el uso de sesiones aquí

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Usuarios
app.MapControllerRoute(
    name: "Users",
    pattern: "{controller=Users}/{action=Index}/{id?}");

app.Run();
