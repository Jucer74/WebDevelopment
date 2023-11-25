using AutoMapper;
using RecipesApi.Dtos;
using RecipesApi.Models;

namespace RecipesApi.Mapping;

public class MappingProfile: Profile
{
    public MappingProfile()
    {
        CreateMap<CategoryDto, Category>();
        CreateMap<Category, CategoryDto>();
        CreateMap<RecipeDto, Recipe>();
        CreateMap<Recipe, RecipeDto>();
    }
}
