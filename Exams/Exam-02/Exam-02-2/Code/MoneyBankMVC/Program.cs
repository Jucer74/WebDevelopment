using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Context;
using MoneyBankMVC.Services;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

// Add DBContext
builder.Services.AddDbContext<AppDbContext>(options => options.UseMySQL(builder.Configuration.GetConnectionString("CnnStr")!));

// Add services to the contiainer.
builder.Services.AddControllersWithViews();

var cultureInfo = new CultureInfo("en-US");
cultureInfo.NumberFormat.CurrencyDecimalSeparator = ".";
CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

builder.Services.AddScoped<IAccountService,AccountService>();

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

app.Run();
