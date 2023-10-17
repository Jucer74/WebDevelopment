using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using WebDev.Services.Entities;

namespace WebDev.Services
{
    public class UsersService
    {
        private string BaseUrl { get; }
        private HttpClient _httpClient;

        public UsersService(string baseUrl)
        {
            BaseUrl = baseUrl;
            _httpClient = new HttpClient();
            SetupHttpConnection(_httpClient, baseUrl);
        }

        private void SetupHttpConnection(HttpClient httpClient, string baseUrl)
        {
            httpClient.BaseAddress = new Uri(baseUrl);
            httpClient.DefaultRequestHeaders.Clear();
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<List<UserDto>> GetUsers()
        {
            var usersList = new List<UserDto>();

            HttpResponseMessage response = await _httpClient.GetAsync("api/Users");

            if (response.IsSuccessStatusCode)
            {
                var responseContent = response.Content.ReadAsStringAsync().Result;
                usersList = JsonConvert.DeserializeObject<List<UserDto>>(responseContent);
            }

            return usersList;
        }

        public async Task<UserDto> GetUserById(int id)
        {
            UserDto user = null;

            HttpResponseMessage response = await _httpClient.GetAsync($"api/Users/{id}");

            if (response.IsSuccessStatusCode)
            {
                var responseContent = response.Content.ReadAsStringAsync().Result;
                user = JsonConvert.DeserializeObject<UserDto>(responseContent);
            }

            return user;
        }

        public async Task<UserDto> AddUser(UserDto user)
        {
            UserDto userDtoResponse = null;

            StringContent content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _httpClient.PostAsync($"api/Users", content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = response.Content.ReadAsStringAsync().Result;
                userDtoResponse = JsonConvert.DeserializeObject<UserDto>(responseContent);
            }

            return userDtoResponse;
        }

        public async Task<UserDto> UpdateUser(UserDto user)
        {
            UserDto userDtoResponse = null;

            StringContent content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _httpClient.PutAsync($"api/Users/{user.Id}", content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = response.Content.ReadAsStringAsync().Result;
                userDtoResponse = JsonConvert.DeserializeObject<UserDto>(responseContent);
            }

            return userDtoResponse;
        }

        public async Task<UserDto> DeleteUser(int id)
        {
            UserDto userDtoResponse = null;

            HttpResponseMessage response = await _httpClient.DeleteAsync($"api/Users/{id}");

            if (response.IsSuccessStatusCode)
            {
                var responseContent = response.Content.ReadAsStringAsync().Result;
                userDtoResponse = JsonConvert.DeserializeObject<UserDto>(responseContent);
            }

            return userDtoResponse;
        }
    }
}