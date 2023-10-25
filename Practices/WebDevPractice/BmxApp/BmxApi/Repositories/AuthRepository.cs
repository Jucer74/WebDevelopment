using BmxApi.Context;
using BmxApi.Dtos;
using BmxApi.Interfaces;
using BmxApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BmxApi.Repositories;

public class AuthRepository : IAuthRepository
{
    // Vars
    private readonly AppDbContext _appDbContext;

    // Constructor
    public AuthRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    // Methods 
    // Register
    public async Task<RegisterDto> Register(RegisterDto registerDto)
    {
        // Create user
        var user = new User
        {
            Username = registerDto.Username,
            Email = registerDto.Email,
            Password = registerDto.Password
        };

        // Add user to database
        await _appDbContext.Users.AddAsync(user);
        // Save changes
        await _appDbContext.SaveChangesAsync();

        // Return registerDto
        return registerDto;
    }

    // GetUserByEmail
    public async Task<AuthDto?> GetUserByEmail(string? email)
    {
        // Get user by email
        var user = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

        // Return email  
        return user != null ? new AuthDto { Email = user.Email, Password = user.Password } : null;
    }
}