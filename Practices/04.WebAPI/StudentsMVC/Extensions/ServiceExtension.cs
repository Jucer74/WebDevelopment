using StudentsMVC.Services;

namespace StudentsMVC.Extensions
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddServices (this IServiceCollection services)
        {
            services.AddScoped<IStudentService, StudentsService>();
            return services;
        }
    }
}
