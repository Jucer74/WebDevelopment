using Microsoft.Extensions.Configuration;
using System.Configuration;
using WebDev.Application.Config;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDistributedMemoryCache(); // Add distributed memory cache
builder.Services.AddSession(options => {
    options.IdleTimeout = TimeSpan.FromMinutes(1); // Set session timeout
});
builder.Services.AddMvc(); // Add MVC services
builder.Configuration.AddJsonFile("appsettings.json");

builder.Services.Configure<ApiConfiguration>(builder.Configuration.GetSection("ApiConfiguration"));

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

app.UseCookiePolicy(); // Enable cookie policy
app.UseSession(); // Enable session

app.UseRouting();

app.UseAuthorization();

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