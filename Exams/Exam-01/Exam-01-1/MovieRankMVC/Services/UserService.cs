using Newtonsoft.Json;
using RestSharp;
using MovieRankMVC.Models;

namespace MovieRankMVC.Services
{
    public class UserService
    {
        private readonly IConfiguration _configuration;
        private readonly string baseUrl;
        private readonly RestClient _restClient;

        public UserService(RestClient restClient, IConfiguration configuration)
        {
            _configuration = configuration;
            baseUrl = configuration.GetSection("BaseUrl").Value;
            _restClient = restClient;
        }

        public async Task<List<User>> GetAll()
        {
            var UserList = await GetAllUsers();
            return UserList;
        }

        public async Task<User> GetById(int id) 
        {
            var user = await GetUserById(id);
            return user;
        }

        private async Task<List<User>> GetAllUsers()
        {
            var request = new RestRequest($"{baseUrl}/Users", Method.Get);
            var response = await _restClient.GetAsync(request);

            List<User>? data = JsonConvert.DeserializeObject<List<User>>(response.Content!);

            return data!;
        }
        private async Task<User> GetUserById( int id)
        {
            var request = new RestRequest($"{baseUrl}/Users/{id}", Method.Get);
            var response = await _restClient.GetAsync(request);

            User? data = JsonConvert.DeserializeObject<User>(response.Content);
            return data!;
        }
    
    
    }
}
