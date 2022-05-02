using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using PracticeMVC.Models;
using RestSharp;
using System;
using System.Collections.Generic;

namespace PracticeMVC.Services
{
   public class PersonService : IPersonService
   {
      private readonly RestClient restClient;

      public PersonService(IConfiguration configuration)
      {
         var baseUrl = configuration.GetSection("ApiConfiguration")["PeopleApiUrl"];
         restClient = new RestClient(baseUrl);
      }

      public void Add(PersonModel person)
      {
         throw new System.NotImplementedException();
      }

      public void Delete(int id)
      {
         throw new System.NotImplementedException();
      }

      public List<PersonModel> GetAll()
      {
         var request = new RestRequest(string.Empty, Method.Get);
         var response = restClient.GetAsync(request).Result;
         var personList = JsonConvert.DeserializeObject<List<PersonModel>>(response.Content);

         return personList;
      }

      public PersonModel GetById(int id)
      {
         var request = new RestRequest(id.ToString(), Method.Get);
         var response = restClient.GetAsync(request).Result;
         var person = JsonConvert.DeserializeObject<PersonModel>(response.Content);

         return person;
      }

      public void Update(PersonModel person)
      {
         throw new System.NotImplementedException();
      }
   }
}
