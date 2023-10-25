using BmxApi.Exceptions;
using BmxApi.Interfaces;
using BmxApi.Models;

namespace BmxApi.Services;

public class UserService : IUserService
{
    // Vars
    private readonly IUserRepository _userRepository;

    // Constructor
    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    // Methods
    // GetAllUsersAsync
    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetAllUsersAsync();

        // If users is null
        if (users == null)
        {
            throw new NotFoundException("No users found");
        }

        return users;
    }

    // GetUserByIdAsync
    public async Task<User> GetUserByIdAsync(int id)
    {
        var user = await _userRepository.GetUserByIdAsync(id);

        // If user is null
        if (user == null)
        {
            throw new NotFoundException("User not found");
        }

        return user;
    }

    // CreateUserAsync
    public async Task<User> CreateUserAsync(User user)
    {
        // Get the user by id
        var userById = await _userRepository.GetUserByIdAsync(user.Id);

        // If userById is not null
        if (userById != null)
        {
            throw new BadRequestException($"User with Id={user.Id} already exists");
        }

        // Create the user
        var createdUser = await _userRepository.CreateUserAsync(user);

        // Return the created user
        return createdUser;
    }

    // UpdateUserAsync
    public async Task<User> UpdateUserAsync(User user)
    {
        // Get the user by id
        var userById = await _userRepository.GetUserByIdAsync(user.Id);

        // If userById is null
        if (userById == null)
        {
            throw new NotFoundException("User not found");
        }

        // Update the user
        var updatedUser = await _userRepository.UpdateUserAsync(user);

        // Return the updated user
        return updatedUser;
    }

    // DeleteUserAsync
    public async Task DeleteUserAsync(int id)
    {
        // Get the user by id
        var userById = await _userRepository.GetUserByIdAsync(id);

        // If userById is null
        if (userById == null)
        {
            throw new NotFoundException("User not found");
        }

        // Delete the user
        await _userRepository.DeleteUserAsync(id);
    }
}