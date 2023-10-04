using MoneyBankMVC.Services;
using RestSharp;

namespace MoneyBankMVC.Extensions
{
    public static class ServiceExtension
    {
        //Function AddServices in Configuration
        public static IServiceCollection AddServices(this IServiceCollection services)
        {   
            //Add RestClient
            services.AddScoped<RestClient>();


            //Add AccountService
            services.AddScoped<IAccountService, AccountService>();

            return services;
        }
    }
}
