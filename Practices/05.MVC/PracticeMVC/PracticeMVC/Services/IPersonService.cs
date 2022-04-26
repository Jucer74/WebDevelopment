using PracticeMVC.Models;
using System.Collections.Generic;

namespace PracticeMVC.Services
{
   public interface IPersonService
   {
      public void Add(PersonModel person);
      public List<PersonModel> GetAll();
      public PersonModel GetById(int id);
      public void Delete(int id);   
      public void Update(PersonModel person);

   }
}
