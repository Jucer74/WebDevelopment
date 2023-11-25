using AutoMapper;
using FluentValidation;
using InmobiliariaApi.Dtos;
using InmobiliariaApi.Mapping;
using InmobiliariaApi.Services;
using InmobiliariaApi.Validations;

namespace InmobiliariaApi.Extensions;

public static class ModulesExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<IRealEstateService, RealEstateService>();
        services.AddScoped<IRealEstateCategoryService, RealEstateCategoryService>();

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
        services.AddScoped<IValidator<RealEstateDto>, RealEstateValidator>();
        services.AddScoped<IValidator<RealEstateCategoryDto>, RealEstateCategoryValidator>();

        return services;
    }
}