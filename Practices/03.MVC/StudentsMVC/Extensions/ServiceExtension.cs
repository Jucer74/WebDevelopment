namespace StudentsMVC.Extensions
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<IServiceCollection>();
            return services;
        }
    }
}
