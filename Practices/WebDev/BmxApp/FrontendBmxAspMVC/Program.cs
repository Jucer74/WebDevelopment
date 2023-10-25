using FrontendBmxAspMVC.Context;
using FrontendBmxAspMVC.Extensions;
using FrontendBmxAspMVC.Middlewares;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add Context
builder.Services.AddDbContext<AppDbContext>(
    options => { options.UseInMemoryDatabase("InMemoryDatabase"); }
);

// Add services to the container.
builder.Services.AddControllersWithViews();

//Add Services
builder.Services.AddServices();

// Add AutoMapper

// Add Authentication
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "MyCookieAuth";
        options.LoginPath = "/Auth/Login"; // Ruta de inicio de sesión
    });

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

app.UseMiddleware<ExceptionHandlerMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();