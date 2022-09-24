using Microsoft.Extensions.DependencyInjection;
using System.Configuration;
using WebDev.Application.Config;
using ConfigurationManager = Microsoft.Extensions.Configuration.ConfigurationManager;
var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllersWithViews();

ConfigurationManager Configuration = builder.Configuration; // allows both to access and to set up the config
builder.Services.AddControllersWithViews();
builder.Services.Configure<ApiConfiguration>(Configuration.GetSection("ApiConfiguration"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
    // Users
    endpoints.MapControllerRoute(
        name: "Users",
        pattern: "{controller=Users}/{action=Index}/{id?}");
});

app.Run();