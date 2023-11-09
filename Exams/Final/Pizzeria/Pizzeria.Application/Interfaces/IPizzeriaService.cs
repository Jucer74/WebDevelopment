using Pizzeria.Domain.Entities;

namespace Pizzeria.Application.Interfaces;

public interface IPizzeriaService
{
    Task<Pizzerias> CreatePizzeria(Pizzerias entity);
    Task DeletePizzeria(int id);

    Task<IEnumerable<Pizzerias>> GetAllPizzeria();

    Task<Pizzerias> GetPizzeriaById(int id);
    Task<Pizzerias> UpdatePizzeria(int id, Pizzerias entity);

}
