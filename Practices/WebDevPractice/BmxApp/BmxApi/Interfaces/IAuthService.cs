using BmxApi.Dtos;

namespace BmxApi.Interfaces;

public interface IAuthService
{
    // Authenticate a user
    Task<string> Auth(AuthDto authDto);

    // Register a user
    Task<RegisterDto> Register(RegisterDto registerDto);
}