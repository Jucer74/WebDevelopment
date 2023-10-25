using FrontendBmxAspMVC.Dtos;

namespace FrontendBmxAspMVC.Interfaces;

public interface IAuthService
{
    // Authenticate a user
    Task<object?> Auth(AuthDto authDto);

    // Register a user
    Task<RegisterDto?> Register(RegisterDto registerDto);
}