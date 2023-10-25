using BmxApi.Context;
using BmxApi.Extensions;
using BmxApi.Middlewares;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add AppDbContext 
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySQL(builder.Configuration.GetConnectionString("CnnStr")!));

// Add services to the container.
builder.Services.AddServices();

// Add AutoMapper
builder.Services.AddMapping();

// Add FluentValidation
builder.Services.AddValidators();

// Add services to the container.
builder.Services.AddControllers().ConfigureApiBehaviorOptions(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var errorDetails = context.ConstructErrorMessages();
        return new BadRequestObjectResult(errorDetails);
    };
});

// Add Fluent Validation
builder.Services.AddFluentValidationAutoValidation().AddFluentValidationClientsideAdapters();

// Add authentication
builder.Services.AddAuthenticate(builder.Configuration);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add configuration
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Add exception handler
app.ConfigureExceptionHandler();

app.UseHttpsRedirection();

// Add CORS middleware here
app.UseCors(corsPolicyBuilder => corsPolicyBuilder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();