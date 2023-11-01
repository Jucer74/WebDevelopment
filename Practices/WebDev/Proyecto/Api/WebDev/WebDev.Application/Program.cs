using WebDev.Api.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddCors();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(
        options => options.UseMySQL(builder.Configuration.GetConnectionString("CnnStr")!));
builder.Services.AddSwaggerGen(s => s.SwaggerDoc("v1", new OpenApiInfo { Title = "User API", Version = "v1" }));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthorization();

app.MapRazorPages();

app.UseCors(options => {
    options.WithOrigins("http://localhost:3000");
    options.AllowAnyMethod();
    options.AllowAnyHeader();
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "Users",
    pattern: "{controller=Users}/{action=Index}/{id?}");

// Enable middleware to serve generated Swagger as a JSON endpoint.
app.UseSwagger();

// Enable middleware to serve swagger-ui (HTML. JS, CSS, etc.),
// specifying the Swagger JSON endpoint
app.UseSwaggerUI(s => s.SwaggerEndpoint("/swagger/v1/swagger.json", "Users API"));

app.Run();
