using AutoMapper;
using BmxApi.Dtos;
using BmxApi.Interfaces;
using BmxApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BmxApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class BikeController : ControllerBase
{
    // Vars
    private readonly IBikeService _bikeService;
    private readonly IMapper _mapper;

    // Constructor
    public BikeController(IBikeService bikeService, IMapper mapper)
    {
        _bikeService = bikeService;
        _mapper = mapper;
    }

    // Methods
    // GET: api/bike
    [HttpGet]
    public async Task<IActionResult> GetAllBikesAsync()
    {
        var bikes = await _bikeService.GetAllBikesAsync();
        return Ok(_mapper.Map<IEnumerable<Bike>, IEnumerable<BikeDto>>(bikes));
    }

    // GET: api/bike/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetBikeByIdAsync(int id)
    {
        var bike = await _bikeService.GetBikeByIdAsync(id);
        return Ok(_mapper.Map<Bike, BikeDto>(bike));
    }

    // POST: api/bike
    [HttpPost]
    public async Task<IActionResult> CreateBikeAsync([FromBody] BikeDto bikeDto)
    {
        var bike = await _bikeService.CreateBikeAsync(_mapper.Map<BikeDto, Bike>(bikeDto));
        return Ok(_mapper.Map<Bike, BikeDto>(bike));
    }

    // PUT: api/bike/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBikeAsync(int id, [FromBody] BikeDto bikeDto)
    {
        var bike = await _bikeService.UpdateBikeAsync(_mapper.Map<BikeDto, Bike>(bikeDto));
        return Ok(_mapper.Map<Bike, BikeDto>(bike));
    }

    // DELETE: api/bike/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBikeAsync(int id)
    {
        await _bikeService.DeleteBikeAsync(id);
        return Ok(new { message = "Bike deleted successfully." });
    }
}