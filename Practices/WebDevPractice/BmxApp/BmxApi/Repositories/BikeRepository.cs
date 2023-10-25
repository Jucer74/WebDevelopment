using BmxApi.Context;
using BmxApi.Exceptions;
using BmxApi.Interfaces;
using BmxApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BmxApi.Repositories;

public class BikeRepository : IBikeRepository
{
    // Vars
    private readonly AppDbContext _appDbContext;

    // Constructor
    public BikeRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    // Methods (CRUD)

    // GetAllBikesAsync
    public async Task<IEnumerable<Bike>> GetAllBikesAsync()
    {
        // Get all bikes
        var bikes = await _appDbContext.Set<Bike>().ToListAsync();

        // If bikes exist
        return bikes;
    }

    // GetBikeByIdAsync
    public async Task<Bike?> GetBikeByIdAsync(int id)
    {
        var bike = await _appDbContext.Set<Bike>().FindAsync(id);
        return bike;
    }

    // CreateBikeAsync
    public async Task<Bike> CreateBikeAsync(Bike bike)
    {
        var resultBike = await _appDbContext.Set<Bike>().AddAsync(bike);

        // If bike not created
        if (resultBike == null) throw new BadRequestException("Bike Not Created");

        // Save changes
        await _appDbContext.SaveChangesAsync();
        return resultBike.Entity;
    }

    // UpdateBikeAsync
    public async Task<Bike> UpdateBikeAsync(Bike bike)
    {
        // Search original bike
        var originalBike = await _appDbContext.Set<Bike>().FindAsync(bike.Id);

        // If bike exists
        if (originalBike != null)
        {
            // Disconnect original bike
            _appDbContext.Entry(originalBike).State = EntityState.Detached;

            // Update bike
            var updateBike = _appDbContext.Set<Bike>().Update(bike);
            await _appDbContext.SaveChangesAsync();
            return updateBike.Entity;
        }

        throw new NotFoundException($"Bike with Id={bike.Id} Not Found");
    }

    // DeleteBikeAsync
    public async Task DeleteBikeAsync(int id)
    {
        // Search bike
        var bike = await _appDbContext.Set<Bike>().FindAsync(id);

        // If bike exists
        if (bike != null)
        {
            // Delete bike
            _appDbContext.Set<Bike>().Remove(bike);
            await _appDbContext.SaveChangesAsync();
            return;
        }

        throw new NotFoundException($"Bike with Id={id} Not Found");
    }
}