using AutoMapper;
using InmobiliariaApi.Dtos;
using InmobiliariaApi.Models;
using InmobiliariaApi.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace InmobiliariaApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RealEstatesCategoryController : ControllerBase
{
    private readonly IRealEstateCategoryService _RealEstateCategoryService;
    private readonly IMapper _mapper;

    public RealEstatesCategoryController(IRealEstateCategoryService RealEstateCategoryService, IMapper mapper)
    {
        _RealEstateCategoryService = RealEstateCategoryService;
        _mapper = mapper;
    }

    // GET: api/<RealEstatesCategoryController>
    [HttpGet]
    public async Task<IActionResult> GetAllRealEstateCategorys()
    {
        var RealEstateCategorys = await _RealEstateCategoryService.GetAllRealEstateCategorys();
        return Ok(_mapper.Map<List<RealEstateCategory>, List<RealEstateCategoryDto>>(RealEstateCategorys));
    }

    // GET api/<RealEstatesCategoryController>/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetRealEstateCategoryById(int id)
    {
        var RealEstateCategory = await _RealEstateCategoryService.GetRealEstateCategoryById(id);
        return Ok(_mapper.Map<RealEstateCategory, RealEstateCategoryDto>(RealEstateCategory));
    }

    // POST api/<RealEstatesCategoryController>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] RealEstateCategoryDto RealEstateCategoryDto)
    {
        var RealEstateCategory = await _RealEstateCategoryService.CreateRealEstateCategory(_mapper.Map<RealEstateCategoryDto, RealEstateCategory>(RealEstateCategoryDto));
        return Ok(_mapper.Map<RealEstateCategory, RealEstateCategoryDto>(RealEstateCategory));
    }

    // PUT api/<RealEstatesCategoryController>/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] RealEstateCategoryDto RealEstateCategoryDto)
    {
        var RealEstateCategory = await _RealEstateCategoryService.UpdateRealEstateCategory(id, _mapper.Map<RealEstateCategoryDto, RealEstateCategory>(RealEstateCategoryDto));
        return Ok(_mapper.Map<RealEstateCategory, RealEstateCategoryDto>(RealEstateCategory));
    }

    // DELETE api/<RealEstatesCategoryController>/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _RealEstateCategoryService.DeleteRealEstateCategory(id);
        return Ok();
    }
}
