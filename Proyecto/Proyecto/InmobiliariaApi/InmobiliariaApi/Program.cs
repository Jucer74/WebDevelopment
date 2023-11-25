using FluentValidation.AspNetCore;
using InmobiliariaApi.Context;
using InmobiliariaApi.Extensions;
using InmobiliariaApi.Middleware;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options => options.UseMySQL(builder.Configuration.GetConnectionString("CnnStr")!));

builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var errorDetails = context.ConstructErrorMessages();
        return new BadRequestObjectResult(errorDetails);
    };
});

//Add Mvc options
builder.Services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(s => s.SwaggerDoc("v1", new OpenApiInfo { Title = "Real Estate API", Version = "v1" }));

// Add Modules
builder.Services.AddServices();
builder.Services.AddMapping();
builder.Services.AddValidators();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseSwaggerUI(s => s.SwaggerEndpoint("/swagger/v1/swagger.json", "Real Estate API"));
}

// Add the Exception Middleware Handler
app.UseExceptionMiddleware();

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(options => // Configurar la política de CORS
{
    options.WithOrigins("http://localhost:7001");
    options.AllowAnyMethod();
    options.AllowAnyHeader();
});

app.MapControllers();

app.Run();