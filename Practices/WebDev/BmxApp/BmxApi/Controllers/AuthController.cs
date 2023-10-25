using BmxApi.Dtos;
using BmxApi.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BmxApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    // Vars
    private readonly IAuthService _authService;

    // Constructor
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    // POST: api/Auth
    [HttpPost("login")]
    public async Task<IActionResult> AuthAsync([FromBody] AuthDto authDto)
    {
        try
        {
            var token = await _authService.Auth(authDto);
            return Ok(new { Token = token });
        }
        catch (Exception ex)
        {
            // Handle authentication failure
            return Unauthorized(new { ex.Message });
        }
    }

    // POST: api/Auth/register
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterDto registerDto)
    {
        var register = await _authService.Register(registerDto);
        return Ok(register);
    }
}