using Pizzeria.Application.Interfaces;
using Pizzeria.Domain.Entities;
using Pizzeria.Domain.Exceptions;
using Pizzeria.Domain.Interfaces.Repositories;
using System.Xml;

namespace Pizzeria.Application.Services;

public class PizzeriaService : IPizzeriaService
{
    private readonly IPizzeriaRepository _pizzeriaRepository;

    public PizzeriaService(IPizzeriaRepository pizzeriaRepository)
    {
        _pizzeriaRepository = pizzeriaRepository;
    }

    public async Task<Pizzerias> CreatePizzeria(Pizzerias pizzeria)
    {
        return await _pizzeriaRepository.AddAsync(pizzeria);
    }

    public async Task DeletePizzeria(int id)
    {
        var original = await _pizzeriaRepository.GetByIdAsync(id);

        if (original is not null)
        {
            await _pizzeriaRepository.RemoveAsync(original);
            return;
        }

        throw new NotFoundException($"Pizzeria with Id={id} Not Found");
    }

    public async Task<IEnumerable<Pizzerias>> GetAllPizzeria()
    {
        return await _pizzeriaRepository.GetAllAsync();
    }

    public async Task<Pizzerias> GetPizzeriaById(int id)
    {
        var pizzeria = await _pizzeriaRepository.GetByIdAsync(id);

        if (pizzeria is not null)
        {
            return pizzeria;
        }

        throw new NotFoundException($"Pizzeria with Id={id} Not Found");
    }

    public async Task<Pizzerias> UpdatePizzeria(int id, Pizzerias pizzeria)
    {
        if (id != pizzeria.Id)
        {
            throw new BadRequestException($"Id [{id}] is different from Pizzeria.Id [{pizzeria.Id}]");
        }

        var original = await _pizzeriaRepository.GetByIdAsync(id);

        if (original is not null)
        {
            return await _pizzeriaRepository.UpdateAsync(pizzeria);
        }

        throw new NotFoundException($"Pizzeria with Id={id} Not Found");
    }
}
