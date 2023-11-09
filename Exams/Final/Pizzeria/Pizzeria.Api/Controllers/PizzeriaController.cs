using AutoMapper;
using Pizzeria.Api.Dtos;
using Pizzeria.Application.Interfaces;
using Pizzeria.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Xml;

namespace Pizzeria.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PizzeriaController : ControllerBase
{
    private readonly IPizzeriaService _pizzeriaService;
    private readonly IMapper _mapper;

    public PizzeriaController(IPizzeriaService pizzeriaService, IMapper mapper)
    {
        _pizzeriaService = pizzeriaService;
        _mapper = mapper;
    }

    // GET: api/<PizzeriaController>
    [HttpGet]
    public async Task<IActionResult> GetAllPizzeria()
    {
        var pizzeria = await _pizzeriaService.GetAllPizzeria() as List<Pizzerias>;
        return Ok(_mapper.Map<List<Pizzerias>, List<PizzeriaDto>>(pizzeria!));
    }

    // GET api/<PizzeriaController>/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetPizzeriaById(int id)
    {
        var pizzeria = await _pizzeriaService.GetPizzeriaById(id);
        return Ok(_mapper.Map<Pizzerias, PizzeriaDto>(pizzeria));
    }

    // POST api/<PizzeriaController>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] PizzeriaDto pizzeriaDto)
    {
        var pizzeria = await _pizzeriaService.CreatePizzeria(_mapper.Map<PizzeriaDto, Pizzerias>(pizzeriaDto));
        return Ok(_mapper.Map<Pizzerias, PizzeriaDto>(pizzeria));
    }

    // PUT api/<PizzeriaController>/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] PizzeriaDto pizzeriaDto)
    {
        var pizzeria = await _pizzeriaService.UpdatePizzeria(id, _mapper.Map<PizzeriaDto, Pizzerias>(pizzeriaDto));
        return Ok(_mapper.Map<Pizzerias, PizzeriaDto>(pizzeria));
    }

    // DELETE api/<PizzeriaController>/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _pizzeriaService.DeletePizzeria(id);
        return Ok();
    }
}
