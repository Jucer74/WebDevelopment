using AgenteDeportivoApi.Models;
using AgentesDeportivos.Models;

namespace AgenteDeportivoApi.Services;

public interface ISportAgentService
{
    Task<SportAgent> CreateSportAgent(SportAgent SportAgent);

    Task DeleteSportAgent(int id);

    Task<List<SportAgent>> GetAllSportAgent();

    Task<SportAgent> GetSportAgentById(int id);

    Task<SportAgent> UpdateSportAgent(int id, SportAgent SportAgent);

    Task<List<TipoAgenteDeportivo>> GetTipoAgenteDeportivoBySportAgentId(int id);
}