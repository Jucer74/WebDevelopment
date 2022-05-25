using People.Domain.Entities;
using People.Domain.Interfaces.Repositories;
using People.Infrastructure.Common;
using People.Infrastructure.Context;

namespace People.Infrastructure.Repositories
{
   public class PersonRepository : Repository<Person>, IPersonRepository
   {
      public PersonRepository(AppDbContext appDbContext) : base(appDbContext)
      {
      }
   }
}