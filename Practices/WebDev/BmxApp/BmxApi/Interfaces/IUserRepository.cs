using BmxApi.Models;

namespace BmxApi.Interfaces;

public interface IUserRepository
{
    // Get all users
    Task<IEnumerable<User>> GetAllUsersAsync();

    // Get a user by id
    Task<User?> GetUserByIdAsync(int id);

    // Create a user
    Task<User> CreateUserAsync(User user);

    // Update a user
    Task<User> UpdateUserAsync(User user);

    // Delete a user
    Task DeleteUserAsync(int id);
}