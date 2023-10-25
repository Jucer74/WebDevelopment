using FrontendBmxAspMVC.Models;

namespace FrontendBmxAspMVC.Interfaces;

public interface IBikeService
{
    // Get all bikes
    Task<IEnumerable<Bike>?> GetAllBikesAsync();

    // Get a bike by id
    Task<Bike?> GetBikeByIdAsync(int id);

    // Create a bike
    Task<Bike?> CreateBikeAsync(Bike bike);

    // Update a bike
    Task<Bike?> UpdateBikeAsync(int id, Bike bike);

    // Delete a bike
    Task DeleteBikeAsync(int id);
}