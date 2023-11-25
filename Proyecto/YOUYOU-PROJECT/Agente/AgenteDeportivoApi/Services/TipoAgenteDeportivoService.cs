using Microsoft.EntityFrameworkCore;
using AgenteDeportivoApi.Context;
using AgenteDeportivoApi.Exceptions;
using AgenteDeportivoApi.Models;
using AgentesDeportivos.Models;

namespace AgenteDeportivoApi.Services;

public class TipoAgenteDeportivoService : ITipoAgenteDeportivoService
{
    private readonly AppDbContext _appDbContext;

    public TipoAgenteDeportivoService(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }


    public async Task<TipoAgenteDeportivo> CreateTipoAgenteDeportivo(TipoAgenteDeportivo tipoAgenteDeportivo)
    {
        _appDbContext.Set<TipoAgenteDeportivo>().Add(tipoAgenteDeportivo);
        await _appDbContext.SaveChangesAsync();
        return tipoAgenteDeportivo;
    }

    public async Task DeleteTipoAgenteDeportivo(int id)
    {
        var original = await _appDbContext.Set<TipoAgenteDeportivo>().FindAsync(id);

        if (original is null)
        {
            throw new NotFoundException($"TipoAgenteDeportivo with Id={id} Not Found");
        }

        _appDbContext.Set<TipoAgenteDeportivo>().Remove(original);
        await _appDbContext.SaveChangesAsync();
    }

    public async Task<List<TipoAgenteDeportivo>> GetAllTipoAgenteDeportivo()
    {
        return await _appDbContext.Set<TipoAgenteDeportivo>().ToListAsync<TipoAgenteDeportivo>();
    }

    public async Task<TipoAgenteDeportivo> GetTipoAgenteDeportivoById(int id)
    {
        var TipoAgenteDeportivo = await _appDbContext.Set<TipoAgenteDeportivo>().FindAsync(id);
        if (TipoAgenteDeportivo is null)
        {
            throw new NotFoundException($"TipoAgenteDeportivo with Id={id} Not Found");
        }

        return TipoAgenteDeportivo!;
    }
        
    public async Task<TipoAgenteDeportivo> UpdateTipoAgenteDeportivo(int id, TipoAgenteDeportivo TipoAgenteDeportivo)
    {
        if (id != TipoAgenteDeportivo.Id)
        {
            throw new BadRequestException($"Id [{id}] is different to TipoAgenteDeportivo.Id [{TipoAgenteDeportivo.Id}]");
        }

        var original = await _appDbContext.Set<TipoAgenteDeportivo>().FindAsync(id);

        if (original is null)
        {
            throw new NotFoundException($"TipoAgenteDeportivo with Id={id} Not Found");
        }

        _appDbContext.Entry(original).CurrentValues.SetValues(TipoAgenteDeportivo!);
        await _appDbContext.SaveChangesAsync();

        return TipoAgenteDeportivo!;
    }
}
