using AutoMapper;
using BmxApi.Dtos;
using BmxApi.Models;

namespace BmxApi.Mapping;

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