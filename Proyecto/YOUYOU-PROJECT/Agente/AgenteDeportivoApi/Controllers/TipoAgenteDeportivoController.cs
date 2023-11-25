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
public class TipoAgenteDeportivoController : ControllerBase
{
    private readonly ITipoAgenteDeportivoService _TipoAgenteDeportivoService;
    private readonly IMapper _mapper;

    public TipoAgenteDeportivoController(ITipoAgenteDeportivoService TipoAgenteDeportivoService, IMapper mapper)
    {
        _TipoAgenteDeportivoService = TipoAgenteDeportivoService;
        _mapper = mapper;
    }

    // GET: api/<TipoAgenteDeportivoController>
    [HttpGet]
    public async Task<IActionResult> GetAllTipoAgenteDeportivo()
    {
        var TipoAgenteDeportivo = await _TipoAgenteDeportivoService.GetAllTipoAgenteDeportivo();
        return Ok(_mapper.Map<List<TipoAgenteDeportivo>, List<TipoAgenteDeportivoDto>>(TipoAgenteDeportivo));
    }

    // GET api/<TipoAgenteDeportivoController>/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTipoAgenteDeportivoById(int id)
    {
        var TipoAgenteDeportivo = await _TipoAgenteDeportivoService.GetTipoAgenteDeportivoById(id);
        return Ok(_mapper.Map<TipoAgenteDeportivo, TipoAgenteDeportivoDto>(TipoAgenteDeportivo));
    }

    // POST api/<TipoAgenteDeportivoController>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] TipoAgenteDeportivoDto TipoAgenteDeportivoDto)
    {
        var TipoAgenteDeportivo = await _TipoAgenteDeportivoService.CreateTipoAgenteDeportivo(_mapper.Map<TipoAgenteDeportivoDto, TipoAgenteDeportivo>(TipoAgenteDeportivoDto));
        return Ok(_mapper.Map<TipoAgenteDeportivo, TipoAgenteDeportivoDto>(TipoAgenteDeportivo));
    }

    // PUT api/<TipoAgenteDeportivoController>/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] TipoAgenteDeportivoDto TipoAgenteDeportivoDto)
    {
        var TipoAgenteDeportivo = await _TipoAgenteDeportivoService.UpdateTipoAgenteDeportivo(id, _mapper.Map<TipoAgenteDeportivoDto, TipoAgenteDeportivo>(TipoAgenteDeportivoDto));
        return Ok(_mapper.Map<TipoAgenteDeportivo, TipoAgenteDeportivoDto>(TipoAgenteDeportivo));
    }

    // DELETE api/<TipoAgenteDeportivoController>/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _TipoAgenteDeportivoService.DeleteTipoAgenteDeportivo(id);
        return Ok();
    }
}
