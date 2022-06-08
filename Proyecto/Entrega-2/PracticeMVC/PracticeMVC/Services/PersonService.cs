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
        private readonly string baseUrl;


        public PersonService(IConfiguration configuration)
        {
            baseUrl = configuration.GetSection("ApiConfiguration")["PeopleApiUrl"];
            restClient = new RestClient(baseUrl);
        }


        public void Add(PersonModel person)
        {
            var request = new RestRequest(string.Empty, Method.Post) { RequestFormat = DataFormat.Json };
            request.AddBody(person);

            var response = restClient.ExecuteAsync<PersonModel>(request);
                

            Console.WriteLine(response);
        }

        public void Delete(int id)
        {
            var request = new RestRequest(id.ToString(), Method.Delete);
            var response = restClient.DeleteAsync(request).Result;

            Console.WriteLine(response);
        }

        public List<PersonModel> GetAll()
        {
            var request = new RestRequest(string.Empty, Method.Get);
            var response = restClient.GetAsync(request).Result;
            List<PersonModel> personList = JsonConvert.DeserializeObject<List<PersonModel>>(response.Content);

            return personList;
        }

        public PersonModel GetById(int id)
        {
            var request = new RestRequest(id.ToString(), Method.Get);
            var response = restClient.GetAsync(request).Result;
            PersonModel person = JsonConvert.DeserializeObject<PersonModel>(response.Content);

            return person;
        }

        public void Update(PersonModel person)
        {
            var request = new RestRequest(person.Id.ToString(), Method.Put) { RequestFormat = DataFormat.Json };
            request.AddBody(person);
            var response = restClient.ExecuteAsync<PersonModel>(request);

            Console.WriteLine(response);
        }
    }
}
