using RestSharp;
using AutoMapper;
using FrontendBmxAspMVC.Interfaces;
using FrontendBmxAspMVC.Mapping;
using FrontendBmxAspMVC.Services;

namespace FrontendBmxAspMVC.Extensions;

public static class ModulesExtension
{
    // Function AddServices
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        // Add RestClient
        services.AddScoped<RestClient>();

        // Add IHttpContextAccessor
        services.AddHttpContextAccessor();

        // AddScoped IUserService
        services.AddScoped<IUserService, UserService>();
        // AddScoped IBikeService
        services.AddScoped<IBikeService, BikeService>();
        // AddScoped IAuthService
        services.AddScoped<IAuthService, AuthService>();

        return services;
    }

    // Function AddAutoMapper
    public static IServiceCollection AddMapping(this IServiceCollection services)
    {
        // Auto Mapper Configurations
        var mapperConfig = new MapperConfiguration(mc => { mc.AddProfile(new MappingProfile()); });

        IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);

        return services;
    }
}