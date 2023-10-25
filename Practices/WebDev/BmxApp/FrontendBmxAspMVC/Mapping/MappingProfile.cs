using AutoMapper;
using FrontendBmxAspMVC.Dtos;
using FrontendBmxAspMVC.Models;

namespace FrontendBmxAspMVC.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Mapping from Model to Dto Bike
        CreateMap<BikeDto, Bike>();
        CreateMap<Bike, BikeDto>();

        // Mapping from Dto to Model User
        CreateMap<UserDto, User>();
        CreateMap<User, UserDto>();
    }
}