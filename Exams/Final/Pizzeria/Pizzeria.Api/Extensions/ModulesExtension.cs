using AutoMapper;
using FluentValidation;
using Pizzeria.Api.Dtos;
using Pizzeria.Api.Mapping;
using Pizzeria.Api.Validators;
using Pizzeria.Application.Interfaces;
using Pizzeria.Application.Services;
using Pizzeria.Domain.Interfaces.Repositories;
using Pizzeria.Infrastructure.Repositories;

namespace Pizzeria.Api.Extensions;

public static class ModulesExtension
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<IPizzeriaService, PizzeriaService>();

        return services;
    }

    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IPizzeriaRepository, PizzeriaRepository>();

        return services;
    }

    public static IServiceCollection AddMapping(this IServiceCollection services)
    {
        // Auto Mapper Configurations
        var mapperConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new MappingProfile());
        });

        IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);

        return services;
    }

    public static IServiceCollection AddValidators(this IServiceCollection services)
    {
        services.AddScoped<IValidator<PizzeriaDto>, PizzeriaValidator>();

        return services;
    }
}
