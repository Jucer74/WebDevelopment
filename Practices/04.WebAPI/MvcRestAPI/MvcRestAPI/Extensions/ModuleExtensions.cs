
using MvcRestAPI.Services;
using RestSharp;

namespace MvcRestAPI.Extensions;

public static class ModuleExtensions
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
