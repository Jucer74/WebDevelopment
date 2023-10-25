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
public class UserController : ControllerBase
{
    // Vars
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    // Constructor
    public UserController(IUserService userService, IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
    }

    // Methods
    // GET: api/user
    [HttpGet]
    public async Task<IActionResult> GetAllUsersAsync()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(_mapper.Map<IEnumerable<User>, IEnumerable<UserDto>>(users));
    }

    // GET: api/user/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserByIdAsync(int id)
    {
        var user = await _userService.GetUserByIdAsync(id);
        return Ok(_mapper.Map<User, UserDto>(user));
    }

    // POST: api/user
    [HttpPost]
    public async Task<IActionResult> CreateUserAsync([FromBody] UserDto userDto)
    {
        var user = await _userService.CreateUserAsync(_mapper.Map<UserDto, User>(userDto));
        return Ok(_mapper.Map<User, UserDto>(user));
    }

    // PUT: api/user/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUserAsync(int id, [FromBody] UserDto userDto)
    {
        var user = await _userService.UpdateUserAsync(_mapper.Map<UserDto, User>(userDto));
        return Ok(_mapper.Map<User, UserDto>(user));
    }

    // DELETE: api/user/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserAsync(int id)
    {
        await _userService.DeleteUserAsync(id);
        return Ok(new { message = "User deleted successfully." });
    }
}