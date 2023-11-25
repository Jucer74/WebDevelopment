using AutoMapper;
using InmobiliariaApi.Dtos;
using InmobiliariaApi.Models;

namespace InmobiliariaApi.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<RealEstateDto, RealEstate>();
        CreateMap<RealEstate, RealEstateDto>();
        CreateMap<RealEstateCategoryDto, RealEstateCategory>();
        CreateMap<RealEstateCategory, RealEstateCategoryDto>();
    }
}
