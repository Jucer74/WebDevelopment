using AutoMapper;
using FluentValidation;
using RecipesApi.Dtos;
using RecipesApi.Mapping;
using RecipesApi.Services;
using RecipesApi.Validations;

namespace RecipesApi.Extensions;

public static class ModulesExtension
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IRecipeService, RecipeService>();

        return services;
    }

    public static IServiceCollection AddMapping(this IServiceCollection services)
    {

        // Auto Mapper Configurations
         var mapperConfig = new MapperConfiguration(mc =>
         {
             mc.AddProfile(new MappingProfile());
         });

        IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);

        return services;
    }

    public static IServiceCollection AddValidators(this IServiceCollection services)
    {
        services.AddScoped<IValidator<CategoryDto>, CategoryValidator>();
        services.AddScoped<IValidator<RecipeDto>, RecipeValidator>();

        return services;
    }


}
