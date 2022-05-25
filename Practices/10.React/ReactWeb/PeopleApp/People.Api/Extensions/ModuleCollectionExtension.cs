using Microsoft.Extensions.DependencyInjection;
using People.Application.Interfaces;
using People.Application.Services;
using People.Domain.Common;
using People.Domain.Entities;
using People.Domain.Interfaces.Repositories;
using People.Infrastructure.Common;
using People.Infrastructure.Repositories;

namespace People.Api.Extensions
{
   public static class ModuleCollectionExtension
   {
      public static IServiceCollection AddCoreModules(this IServiceCollection services)
      {
         // Services / Use Cases
         services.AddScoped<IPersonService, PersonService>();

         return services;
      }

      public static IServiceCollection AddInfrastructureModules(this IServiceCollection services)
      {
         // Repositories
         services.AddScoped<IPersonRepository, PersonRepository>();
         

         return services;
      }
   }
}