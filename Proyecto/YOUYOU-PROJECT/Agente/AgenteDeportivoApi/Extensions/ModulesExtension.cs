using AutoMapper;
using FluentValidation;
using AgenteDeportivoApi.Dtos;
using AgenteDeportivoApi.Mapping;
using AgenteDeportivoApi.Services;
using AgenteDeportivoApi.Validations;

namespace AgenteDeportivoApi.Extensions;

public static class ModulesExtension
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<ISportAgentService, SportAgentService>();
        services.AddScoped<ITipoAgenteDeportivoService, TipoAgenteDeportivoService>();

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
        services.AddScoped<IValidator<SportAgentDto>, SportAgentValidator>();
        services.AddScoped<IValidator<TipoAgenteDeportivoDto>, TipoAgenteDeportivoValidator>();

        return services;
    }


}
