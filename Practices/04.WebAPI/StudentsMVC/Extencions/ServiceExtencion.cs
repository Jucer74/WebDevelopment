using Microsoft.CodeAnalysis.CSharp.Syntax;
using StudentsMVC.Services;

namespace StudentsMVC.Extencions;

public static class ServiceExtencion
{




    public static IServiceCollection AddServices(this IServiceCollection services) 
    {
    
         services.AddScoped<IStudentService, StudentService>();
        return services;
    }




}
