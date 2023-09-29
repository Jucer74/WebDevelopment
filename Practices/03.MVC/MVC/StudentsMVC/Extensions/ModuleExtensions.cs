using StudentsMVC.Services;

namespace StudentsMVC.Extensions;

public static class ModuleExtensions
{

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<IStudentService, StudentService>();
        return services;
    }

}
