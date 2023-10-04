using MoneyBankMVC.Services;
using RestSharp;

namespace MoneyBankMVC.Extensions
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<RestClient>();

            services.AddScoped<IAccountService, AccountService>();

            return services;
        }
    }
}
