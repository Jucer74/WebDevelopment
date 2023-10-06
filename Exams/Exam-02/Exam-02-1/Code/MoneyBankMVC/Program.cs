using Microsoft.EntityFrameworkCore;
// using MySql.EntityFrameworkCore;
using MoneyBankMVC.Context;
using MoneyBankMVC.Services;
using RestSharp;

var builder = WebApplication.CreateBuilder(args);
var baseUrl = builder.Configuration.GetSection("AccountsAPIUrl").Value;

// Add services to the container.
builder.Services.AddControllersWithViews();
// builder.Services.AddSingleton<IAccountService>(
//     new AccountService()
// );
builder.Services.AddMvc();
builder.Services.AddScoped<RestClient>(_ => new RestClient(baseUrl!));
builder.Services.AddScoped<AccountService>();
builder.Services.AddDbContext<MoneyBankContext>(options => 
    options.UseMySQL(builder.Configuration.GetConnectionString("CnnStr")!));

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