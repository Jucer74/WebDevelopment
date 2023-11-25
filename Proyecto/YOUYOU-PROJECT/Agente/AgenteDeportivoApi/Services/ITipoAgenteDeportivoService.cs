using AgenteDeportivoApi.Models;
using AgentesDeportivos.Models;

namespace AgenteDeportivoApi.Services;

public interface ITipoAgenteDeportivoService
{
    Task<TipoAgenteDeportivo> CreateTipoAgenteDeportivo(TipoAgenteDeportivo tipoAgenteDeportivo);

    Task DeleteTipoAgenteDeportivo(int id);

    Task<List<TipoAgenteDeportivo>> GetAllTipoAgenteDeportivo();

    Task<TipoAgenteDeportivo> GetTipoAgenteDeportivoById(int id);

    Task<TipoAgenteDeportivo> UpdateTipoAgenteDeportivo(int id, TipoAgenteDeportivo TipoAgenteDeportivo);

}
