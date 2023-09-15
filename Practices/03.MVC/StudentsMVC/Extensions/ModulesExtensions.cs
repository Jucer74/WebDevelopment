using StudentsMVC.Services;

namespace StudentsMVC.Extensions;

public static class ModulesExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<IStudentService, StudentService>();

        return services;
    }
}
