using BmxApi.Models;

namespace BmxApi.Interfaces;

public interface IBikeRepository
{
    // Get all bikes
    Task<IEnumerable<Bike>> GetAllBikesAsync();

    // Get a bike by id
    Task<Bike?> GetBikeByIdAsync(int id);

    // Create a bike
    Task<Bike> CreateBikeAsync(Bike bike);

    // Update a bike
    Task<Bike> UpdateBikeAsync(Bike bike);

    // Delete a bike
    Task DeleteBikeAsync(int id);
}