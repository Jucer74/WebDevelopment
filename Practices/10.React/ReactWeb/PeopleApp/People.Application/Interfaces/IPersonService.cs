using People.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace People.Application.Interfaces
{
   public interface IPersonService
   {
      public Task AddAsync(Person entity);

      public Task<IEnumerable<Person>> GetAllAsync();

      public Task<Person> GetByIdAsync(int id);

      public Task<IEnumerable<Person>> FindAsync(Expression<Func<Person, bool>> predicate);

      public Task UpdateAsync(int id, Person entity);

      public Task RemoveAsync(int id);
   }
}