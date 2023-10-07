using MoneyBankMVC.Services;
using System.Reflection.Metadata.Ecma335;

namespace MoneyBankMVC.Extensions
{
    public static class ModulesExtensions
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddScoped<IAccountService, AccountService>();
            return services;
        }
    }
}
