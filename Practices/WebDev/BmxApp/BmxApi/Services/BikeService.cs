using BmxApi.Exceptions;
using BmxApi.Interfaces;
using BmxApi.Models;

namespace BmxApi.Services;

public class BikeService : IBikeService
{
    // Vars
    private readonly IBikeRepository _bikeRepository;

    // Constructor
    public BikeService(IBikeRepository bikeRepository)
    {
        _bikeRepository = bikeRepository;
    }

    // Methods
    // GetAllBikesAsync
    public async Task<IEnumerable<Bike>> GetAllBikesAsync()
    {
        var bikes = await _bikeRepository.GetAllBikesAsync();

        // If bikes is null
        if (bikes == null)
        {
            throw new NotFoundException("No bikes found");
        }

        return bikes;
    }

    // GetBikeByIdAsync
    public async Task<Bike> GetBikeByIdAsync(int id)
    {
        var bike = await _bikeRepository.GetBikeByIdAsync(id);

        // If bike is null
        if (bike == null)
        {
            throw new NotFoundException("Bike not found");
        }

        return bike;
    }

    // CreateBikeAsync
    public async Task<Bike> CreateBikeAsync(Bike bike)
    {
        // Get the bike by id
        var bikeById = await _bikeRepository.GetBikeByIdAsync(bike.Id);

        // If bikeById is not null
        if (bikeById != null)
        {
            throw new BadRequestException($"Bike with Id={bike.Id} already exists");
        }

        // Create the bike
        var createdBike = await _bikeRepository.CreateBikeAsync(bike);

        // Return the created bike
        return createdBike;
    }

    // UpdateBikeAsync
    public async Task<Bike> UpdateBikeAsync(Bike bike)
    {
        // Get the bike by id
        var bikeById = await _bikeRepository.GetBikeByIdAsync(bike.Id);

        // If bikeById is null
        if (bikeById == null)
        {
            throw new NotFoundException("Bike not found");
        }

        // Update the bike
        var updatedBike = await _bikeRepository.UpdateBikeAsync(bike);

        // Return the updated bike
        return updatedBike;
    }

    // DeleteBikeAsync
    public async Task DeleteBikeAsync(int id)
    {
        // Get the bike by id
        var bikeById = await _bikeRepository.GetBikeByIdAsync(id);

        // If bikeById is null
        if (bikeById == null)
        {
            throw new NotFoundException("Bike not found");
        }

        // Delete the bike
        await _bikeRepository.DeleteBikeAsync(id);
    }
}