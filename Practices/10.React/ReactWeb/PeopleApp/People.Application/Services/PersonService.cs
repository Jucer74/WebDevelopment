using People.Application.Interfaces;
using People.Domain.Entities;
using People.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace People.Application.Services
{
   public class PersonService : IPersonService
   {
      private readonly IPersonRepository _personRepository;

      public PersonService(IPersonRepository personRepository)
      {
         _personRepository = personRepository;
      }

      public async Task AddAsync(Person entity)
      {
         await _personRepository.AddAsync(entity);
      }

      public async Task<IEnumerable<Person>> FindAsync(Expression<Func<Person, bool>> predicate)
      {
         return await _personRepository.FindAsync(predicate);
      }

      public async Task<IEnumerable<Person>> GetAllAsync()
      {
         return await _personRepository.GetAllAsync();
      }

      public async Task<Person> GetByIdAsync(int id)
      {
         var person = await _personRepository.GetByIdAsync(id);

         // Validte If Exist
         return person;
      }

      public async Task RemoveAsync(int id)
      {
         var person = await _personRepository.GetByIdAsync(id);
         await _personRepository.RemoveAsync(person);
      }

      public async Task UpdateAsync(int id, Person entity)
      {
         // Validate if Exist
         await _personRepository.UpdateAsync(entity);
      }
   }
}