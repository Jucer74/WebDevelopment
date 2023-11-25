using AutoMapper;
using AgenteDeportivoApi.Dtos;
using AgenteDeportivoApi.Models;
using System.Xml;
using AgentesDeportivos.Models;

namespace AgenteDeportivoApi.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<SportAgentDto, SportAgent>();
        CreateMap<SportAgent, SportAgentDto>();
        CreateMap<TipoAgenteDeportivoDto, TipoAgenteDeportivo>();
        CreateMap<TipoAgenteDeportivo, TipoAgenteDeportivoDto>();
    }
}
