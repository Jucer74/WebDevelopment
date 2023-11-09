using AutoMapper;
using Pizzeria.Api.Dtos;
using Pizzeria.Domain.Entities;

namespace Pizzeria.Api.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<PizzeriaDto, Pizzerias>();
        CreateMap<Pizzerias, PizzeriaDto>();
    }
}
