using InmobiliariaApi.Context;
using InmobiliariaApi.Exceptions;
using InmobiliariaApi.Models;
using Microsoft.EntityFrameworkCore;

namespace InmobiliariaApi.Services;

public class RealEstateService : IRealEstateService
{
    private readonly AppDbContext _appDbContext;

    public RealEstateService(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<RealEstate> CreateRealEstate(RealEstate RealEstate)
    {
        _appDbContext.Set<RealEstate>().Add(RealEstate);
        await _appDbContext.SaveChangesAsync();
        return RealEstate;
    }

    public async Task DeleteRealEstate(int id)
    {
        var realEstate = await _appDbContext.realestate
                                             .Include(re => re.Category)  
                                             .FirstOrDefaultAsync(re => re.Id == id);

        if (realEstate is null)
        {
            throw new NotFoundException($"Real Estate with Id={id} Not Found");
        }

        _appDbContext.realestatecategory.RemoveRange(realEstate.Category);
        _appDbContext.realestate.Remove(realEstate);

        await _appDbContext.SaveChangesAsync();
    }

    public async Task<List<RealEstate>> GetAllRealEstates()
    {
        return await _appDbContext.Set<RealEstate>().ToListAsync<RealEstate>();
    }

    public async Task<RealEstate> GetRealEstateById(int id)
    {
        var RealEstate = await _appDbContext.Set<RealEstate>().FindAsync(id);
        if (RealEstate is null)
        {
            throw new NotFoundException($"Real Estate with Id={id} Not Found");
        }
        return RealEstate!;
    }

    public async Task<List<RealEstateCategory>> GetRealEstateCategoryByRealEstateId(int id)
    {
        var RealEstateCategory = await _appDbContext.realestate
                                .Include(m => m.Category)
                                .Where(t => t.Id == id)
                                .FirstOrDefaultAsync();

        if (RealEstateCategory is null)
        {
            throw new NotFoundException($"Real Estate Category with Id={id} Not Found");
        }

        return RealEstateCategory!.Category;
    }

    public async Task<RealEstate> UpdateRealEstate(int id, RealEstate RealEstate)
    {
        if (id != RealEstate.Id)
        {
            throw new BadRequestException($"Id [{id}] is different to RealEstate.Id [{RealEstate.Id}]");
        }

        var original = await _appDbContext.Set<RealEstate>().FindAsync(id);

        if (original is null)
        {
            throw new NotFoundException($"Real Estate with Id={id} Not Found");
        }

        _appDbContext.Entry(original).CurrentValues.SetValues(RealEstate!);
        await _appDbContext.SaveChangesAsync();

        return RealEstate!;
    }
}
