using BmxApi.Context;
using BmxApi.Exceptions;
using BmxApi.Interfaces;
using BmxApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BmxApi.Repositories;

public class UserRepository : IUserRepository
{
    // Vars
    private readonly AppDbContext _appDbContext;


    // Constructor
    public UserRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    // Methods (CRUD)

    // GetAllUsersAsync
    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        // Get all users
        var users = await _appDbContext.Set<User>().ToListAsync();

        // If users exist
        return users;
    }

    // GetUserByIdAsync
    public async Task<User?> GetUserByIdAsync(int id)
    {
        var user = await _appDbContext.Set<User>().FindAsync(id);
        return user;
    }

    // CreateUserAsync
    public async Task<User> CreateUserAsync(User user)
    {
        var resultUser = await _appDbContext.Set<User>().AddAsync(user);

        // If user not created
        if (resultUser == null) throw new BadRequestException("User Not Created");

        // Save changes
        await _appDbContext.SaveChangesAsync();
        return resultUser.Entity;
    }

    // UpdateUserAsync
    public async Task<User> UpdateUserAsync(User user)
    {
        // Search original user
        var originalUser = await _appDbContext.Set<User>().FindAsync(user.Id);

        // If user exists
        if (originalUser != null)
        {
            // Disconnect original bike
            _appDbContext.Entry(originalUser).State = EntityState.Detached;

            // Update user
            var resultUser = _appDbContext.Set<User>().Update(user);
            await _appDbContext.SaveChangesAsync();
            return resultUser.Entity;
        }

        throw new NotFoundException($"User with Id={user.Id} Not Found");
    }

    // DeleteUserAsync
    public async Task DeleteUserAsync(int id)
    {
        // Search user
        var user = await _appDbContext.Set<User>().FindAsync(id);

        // If user exists
        if (user != null)
        {
            // Delete user
            _appDbContext.Set<User>().Remove(user);
            await _appDbContext.SaveChangesAsync();
            return;
        }

        throw new NotFoundException($"User with Id={id} Not Found");
    }
}