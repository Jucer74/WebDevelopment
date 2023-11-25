using InmobiliariaApi.Models;

namespace InmobiliariaApi.Services;

public interface IRealEstateService
{
    Task<RealEstate> CreateRealEstate(RealEstate RealEstate);
    Task DeleteRealEstate(int id);
    Task<List<RealEstate>> GetAllRealEstates();
    Task<RealEstate> GetRealEstateById(int id);
    Task<RealEstate> UpdateRealEstate(int id, RealEstate RealEstate);
    Task<List<RealEstateCategory>> GetRealEstateCategoryByRealEstateId(int id);
}
