using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BmxApi.Dtos;
using BmxApi.Exceptions;
using BmxApi.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace BmxApi.Services;

public class AuthService : IAuthService
{
    // Vars
    private readonly IAuthRepository _authRepository;
    private readonly string? _secretKey;

    // Constructor
    public AuthService(IAuthRepository authRepository, IConfiguration config)
    {
        _authRepository = authRepository;
        _secretKey = config.GetSection("AppSettings").GetSection("SecretKey").Value;
    }

    public async Task<string> Auth(AuthDto authDto)
    {
        // Get user by email
        var user = await _authRepository.GetUserByEmail(authDto.Email);

        // Check if user exists
        if (user == null)
            throw new NotFoundException($"User with email {authDto.Email} not found");

        // Check if password is correct
        if (user.Password != authDto.Password)
            throw new BadRequestException("Password is incorrect");

        // Get keyBytes
        var keyBytes = Encoding.ASCII.GetBytes(_secretKey!);
        var claims = new ClaimsIdentity();
        if (user.Email != null) claims.AddClaim(new Claim(ClaimTypes.Email, user.Email));

        // Token descriptor
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = claims,
            Expires = DateTime.UtcNow.AddMinutes(5),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes),
                SecurityAlgorithms.HmacSha256Signature)
        };

        // Token handler
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        // String token
        var tokenString = tokenHandler.WriteToken(token);

        // Return Token
        return tokenString;
    }

    public async Task<RegisterDto> Register(RegisterDto registerDto)
    {
        // Check if user exists
        if (await _authRepository.GetUserByEmail(registerDto.Email) != null)
            throw new BadRequestException($"User with email {registerDto.Email} already exists");

        // Add user to database
        await _authRepository.Register(registerDto);

        // Return registerDto
        return registerDto;
    }
}