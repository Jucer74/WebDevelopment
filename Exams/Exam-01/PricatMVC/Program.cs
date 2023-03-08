using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using PricatMVC.Context;
using PricatMVC.Data;
using System;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<PricatMVC.Context.AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("CnnStr")));

// Add services to the container.
builder.Services.AddControllersWithViews();


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
    pattern: "{controller=AppDb}/{action=Index}/{id?}");

app.Run();
