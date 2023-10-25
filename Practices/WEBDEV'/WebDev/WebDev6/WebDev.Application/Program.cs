using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using WebDev.Application.Config;

var builder = WebApplication.CreateBuilder(args);

// Configura la configuraci�n de la aplicaci�n.
builder.Configuration.AddJsonFile("appsettings.json");

// Configura los servicios.
builder.Services.AddControllersWithViews();

// Lee la configuraci�n y la inyecta en el modelo ApiConfiguration.
builder.Services.Configure<ApiConfiguration>(builder.Configuration.GetSection("ApiConfiguration"));

// Agrega la memoria cach� distribuida y la sesi�n
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(1); // Puedes ajustar el tiempo de inactividad seg�n tus necesidades.
});

var app = builder.Build();

// Configura el pipeline de solicitudes HTTP.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // El valor HSTS predeterminado es de 30 d�as. Puede que desees cambiarlo en escenarios de producci�n, consulta https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCookiePolicy();
app.UseSession();

app.UseRouting();

app.UseAuthorization();

app.UseSession(); // Agrega el uso de sesiones aqu�

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Usuarios
app.MapControllerRoute(
    name: "Users",
    pattern: "{controller=Users}/{action=Index}/{id?}");

app.Run();
