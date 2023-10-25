using BmxApi.Dtos;

namespace BmxApi.Interfaces;

public interface IAuthRepository
{
    // Register a user
    Task<RegisterDto> Register(RegisterDto registerDto);

    // Get a user by email
    Task<AuthDto?> GetUserByEmail(string? email);
}