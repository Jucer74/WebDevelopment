using AutoMapper;
using InmobiliariaApi.Dtos;
using InmobiliariaApi.Models;
using InmobiliariaApi.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InmobiliariaApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RealEstatesController : ControllerBase
{
    private readonly IRealEstateService _RealEstateService;
    private readonly IMapper _mapper;

    public RealEstatesController(IRealEstateService RealEstateService, IMapper mapper)
    {
        _RealEstateService = RealEstateService;
        _mapper = mapper;
    }

    // GET: api/<RealEstatesController>
    [HttpGet]
    public async Task<IActionResult> GetAllRealEstates()
    {
        var RealEstates = await _RealEstateService.GetAllRealEstates();
        return Ok(_mapper.Map<List<RealEstate>, List<RealEstateDto>>(RealEstates));
    }

    // GET api/<RealEstatesController>/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetRealEstateById(int id)
    {
        var RealEstate = await _RealEstateService.GetRealEstateById(id);
        return Ok(_mapper.Map<RealEstate, RealEstateDto>(RealEstate));
    }

    // POST api/<RealEstatesController>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] RealEstateDto RealEstateDto)
    {
        var RealEstate = await _RealEstateService.CreateRealEstate(_mapper.Map<RealEstateDto, RealEstate>(RealEstateDto));
        return Ok(_mapper.Map<RealEstate, RealEstateDto>(RealEstate));
    }

    // PUT api/<RealEstatesController>/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] RealEstateDto RealEstateDto)
    {
        var RealEstate = await _RealEstateService.UpdateRealEstate(id, _mapper.Map<RealEstateDto, RealEstate>(RealEstateDto));
        return Ok(_mapper.Map<RealEstate, RealEstateDto>(RealEstate));
    }

    // DELETE api/<RealEstatesController>/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _RealEstateService.DeleteRealEstate(id);
        return Ok();
    }

    // GET api/<RealEstatesController>/5/Category
    [HttpGet("{id}/Category")]
    public async Task<IActionResult> GetCategoryByRealEstateId(int id)
    {
        var Category = await _RealEstateService.GetRealEstateCategoryByRealEstateId(id);
        return Ok(_mapper.Map<List<RealEstateCategory>, List<RealEstateCategoryDto>>(Category));
    }
}