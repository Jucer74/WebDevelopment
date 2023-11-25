using InmobiliariaApi.Models;

namespace InmobiliariaApi.Services;

public interface IRealEstateCategoryService
{
    Task<RealEstateCategory> CreateRealEstateCategory(RealEstateCategory RealEstateCategory);
    Task DeleteRealEstateCategory(int id);
    Task<List<RealEstateCategory>> GetAllRealEstateCategorys();
    Task<RealEstateCategory> GetRealEstateCategoryById(int id);
    Task<RealEstateCategory> UpdateRealEstateCategory(int id, RealEstateCategory RealEstateCategory);
}
