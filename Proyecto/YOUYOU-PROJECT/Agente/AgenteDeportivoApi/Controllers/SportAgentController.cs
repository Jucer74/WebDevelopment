using AutoMapper;
using AgenteDeportivoApi.Dtos;
using AgenteDeportivoApi.Models;
using AgenteDeportivoApi.Services;
using Microsoft.AspNetCore.Mvc;
using AgentesDeportivos.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AgenteDeportivoApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SportAgentController : ControllerBase
{
    private readonly ISportAgentService _SportAgentService;
    private readonly IMapper _mapper;

    public SportAgentController(ISportAgentService SportAgentService, IMapper mapper)
    {
        _SportAgentService = SportAgentService;
        _mapper = mapper;
    }

    // GET: api/<RealEstatesController>
    [HttpGet]
    public async Task<IActionResult> GetAllRealEstates()
    {
        var SportAgent = await _SportAgentService.GetAllSportAgent();
        return Ok(_mapper.Map<List<SportAgent>, List<SportAgentDto>>(SportAgent));
    }

    // GET api/<RealEstatesController>/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetSportAgentById(int id)
    {
        var SportAgent = await _SportAgentService.GetSportAgentById(id);
        return Ok(_mapper.Map<SportAgent, SportAgentDto>(SportAgent));
    }

    // POST api/<RealEstatesController>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] SportAgentDto SportAgentDto)
    {
        var SportAgent = await _SportAgentService.CreateSportAgent(_mapper.Map<SportAgentDto, SportAgent>(SportAgentDto));
        return Ok(_mapper.Map<SportAgent, SportAgentDto>(SportAgent));
    }

    // PUT api/<RealEstatesController>/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] SportAgentDto SportAgentDto)
    {
        var SportAgent = await _SportAgentService.UpdateSportAgent(id, _mapper.Map<SportAgentDto, SportAgent>(SportAgentDto));
        return Ok(_mapper.Map<SportAgent, SportAgentDto>(SportAgent));
    }

    // DELETE api/<RealEstatesController>/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _SportAgentService.DeleteSportAgent(id);
        return Ok();
    }

    // GET api/<RealEstatesController>/5/Category
    [HttpGet("{id}/Category")]
    public async Task<IActionResult> GetCategoryByRealEstateId(int id)
    {
        var Category = await _SportAgentService.GetTipoAgenteDeportivoBySportAgentId(id);
        return Ok(_mapper.Map<List<TipoAgenteDeportivo>, List<TipoAgenteDeportivoDto>>(Category));
    }
}