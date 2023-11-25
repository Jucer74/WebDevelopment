using InmobiliariaApi.Context;
using InmobiliariaApi.Exceptions;
using InmobiliariaApi.Models;
using Microsoft.EntityFrameworkCore;

namespace InmobiliariaApi.Services;

public class RealEstateCategoryService : IRealEstateCategoryService
{
    private readonly AppDbContext _appDbContext;

    public RealEstateCategoryService(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }
    public async Task<RealEstateCategory> CreateRealEstateCategory(RealEstateCategory RealEstateCategory)
    {
        _appDbContext.Set<RealEstateCategory>().Add(RealEstateCategory);
        await _appDbContext.SaveChangesAsync();
        return RealEstateCategory;
    }

    public async Task DeleteRealEstateCategory(int id)
    {
        var original = await _appDbContext.Set<RealEstateCategory>().FindAsync(id);

        if (original is null)
        {
            throw new NotFoundException($"Real Estate Category with Id={id} Not Found");
        }

        _appDbContext.Set<RealEstateCategory>().Remove(original);
        await _appDbContext.SaveChangesAsync();
    }

    public async Task<List<RealEstateCategory>> GetAllRealEstateCategorys()
    {
        return await _appDbContext.Set<RealEstateCategory>().ToListAsync<RealEstateCategory>();
    }

    public async Task<RealEstateCategory> GetRealEstateCategoryById(int id)
    {
        var RealEstateCategory = await _appDbContext.Set<RealEstateCategory>().FindAsync(id);
        if (RealEstateCategory is null)
        {
            throw new NotFoundException($"Real Estate Category with Id={id} Not Found");
        }

        return RealEstateCategory!;
    }

    public async Task<RealEstateCategory> UpdateRealEstateCategory(int id, RealEstateCategory RealEstateCategory)
    {
        if (id != RealEstateCategory.Id)
        {
            throw new BadRequestException($"Id [{id}] is different to RealEstateCategory.Id [{RealEstateCategory.Id}]");
        }

        var original = await _appDbContext.Set<RealEstateCategory>().FindAsync(id);

        if (original is null)
        {
            throw new NotFoundException($"Real Estate Category with Id={id} Not Found");
        }

        _appDbContext.Entry(original).CurrentValues.SetValues(RealEstateCategory!);
        await _appDbContext.SaveChangesAsync();

        return RealEstateCategory!;
    }
}
