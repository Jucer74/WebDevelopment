using Microsoft.EntityFrameworkCore;
using AgenteDeportivoApi.Context;
using AgenteDeportivoApi.Exceptions;
using AgenteDeportivoApi.Models;
using AgentesDeportivos.Models;

namespace AgenteDeportivoApi.Services
{
    public class SportAgentService : ISportAgentService
    {
        private readonly AppDbContext _appDbContext;

        public SportAgentService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<SportAgent> CreateSportAgent(SportAgent SportAgent)
        {
            _appDbContext.Set<SportAgent>().Add(SportAgent);
            await _appDbContext.SaveChangesAsync();
            return SportAgent;
        }

        public async Task DeleteSportAgent(int id)
        {
            var original = await _appDbContext.AgenteDeportivo
                                    .Include(m => m.Categories)
                                    .FirstOrDefaultAsync(t => t.Id == id);
            if (original is null)
            {
                throw new NotFoundException($"Sport with Id={id} Not Found");
            }

            _appDbContext.Agente.RemoveRange(original.Categories);
            _appDbContext.AgenteDeportivo.Remove(original);
        }

        public async Task<List<SportAgent>> GetAllSportAgent()
        {
            return await _appDbContext.Set<SportAgent>().ToListAsync<SportAgent>();
        }

        public async Task<SportAgent> GetSportAgentById(int id)
        {
            var SportAgent = await _appDbContext.Set<SportAgent>().FindAsync(id);
            if (SportAgent is null)
            {
                throw new NotFoundException($"Sport with Id={id} Not Found");
            }
            return SportAgent!;
        }

        public async Task<List<TipoAgenteDeportivo>> GetTipoAgenteDeportivoBySportAgentId(int id)
        {
            var TipoAgenteDeportivo = await _appDbContext.AgenteDeportivo
                                    .Include(m => m.Categories)
                                    .Where(t => t.Id == id)
                                    .FirstOrDefaultAsync();


            return TipoAgenteDeportivo!.Categories;
        }

        public async Task<SportAgent> UpdateSportAgent(int id, SportAgent SportAgent)
        {
            if (id != SportAgent.Id)
            {
                throw new BadRequestException($"Id [{id}] is different to Sport.Id [{SportAgent.Id}]");
            }

            var original = await _appDbContext.Set<SportAgent>().FindAsync(id);

            if (original is null)
            {
                throw new NotFoundException($"Sport with Id={id} Not Found");
            }

            _appDbContext.Entry(original).CurrentValues.SetValues(SportAgent!);
            await _appDbContext.SaveChangesAsync();

            return SportAgent!;
        }
    }
}