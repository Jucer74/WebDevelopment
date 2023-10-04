using mvcTest.Services;

namespace StudentsMVC.Extensions;

public static class ModulesExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<ICrudService, CrudService>();

        return services;
    }
}