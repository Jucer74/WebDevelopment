using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SchoolMVC.Data;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<SchoolMVCContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SchoolMVCContext")));
// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<SchoolMVCContext>(options =>
        options.UseSqlite(builder.Configuration.GetConnectionString("SchoolMVCContext")));
}
else
{
    builder.Services.AddDbContext<SchoolMVCContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("ProductionSchoolMVCContext")));
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
