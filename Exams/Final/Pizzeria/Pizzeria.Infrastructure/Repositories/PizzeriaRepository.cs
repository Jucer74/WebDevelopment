using Pizzeria.Domain.Entities;
using Pizzeria.Domain.Interfaces.Repositories;
using Pizzeria.Infrastructure.Common;
using Pizzeria.Infrastructure.Context;

namespace Pizzeria.Infrastructure.Repositories
{
    public class PizzeriaRepository : Repository<Pizzerias>, IPizzeriaRepository
    {
        public PizzeriaRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }
    }
}
