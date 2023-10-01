using RestSharp;
using StudentsMVC.Services;

namespace StudentsMVC.Extensions;

public static class ModulesExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<IStudentService, StudentService>();

        return services;
    }

    public static IServiceCollection AddRestClient(this IServiceCollection services)
    {
        services.AddSingleton<RestClient>();

        return services;
    }
}
