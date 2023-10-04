
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WebDev.Services.Entities;
using SchoolMVC.Models;

namespace WebDev.Services
{


    public class UsersService
    {
        private HttpClient _httpClient;

        public object JsonConvert { get; private set; }

        public UsersService(string baseUrl)
        {
            BaseUrl = baseUrl;

            _httpClient = new HttpClient();

            SetupHttpConnection(_httpClient, baseUrl);
        }

        private void SetupHttpConnection(HttpClient httpClient, string baseUrl)
        {
            //Passing service base url  
            httpClient.BaseAddress = new Uri(baseUrl);

            httpClient.DefaultRequestHeaders.Clear();

            //Define request data format  
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<List<UserDto>> GetUsers()
        {
            var usersList = new List<UserDto>();

            // Sending request to find web api REST service resource to Get All Users using HttpClient
            HttpResponseMessage response = await _httpClient.GetAsync("api/Users");

            // Checking the response is successful or not which is sent using HttpClient
            if (response.IsSuccessStatusCode)
            {
                // Storing the content response recieved from web api
                var responseContent = response.Content.ReadAsStringAsync().Result;

                //Deserializing the response recieved from web api and storing into the Employee list
                usersList = JsonConvert.DeserializeObject<List<UserDto>>(responseContent);
            }

            return usersList;
        }


        public async Task<UserDto> GetUserById(int id)
        {
            UserDto user = null;

            // Sending request to find web api REST service resource to Get All Users using HttpClient
            HttpResponseMessage response = await _httpClient.GetAsync($"api/Users/{id}");

            // Checking the response is successful or not which is sent using HttpClient
            if (response.IsSuccessStatusCode)
            {
                // Storing the content response recieved from web api
                var responseContent = response.Content.ReadAsStringAsync().Result;

                //Deserializing the response recieved from web api and storing into the Employee list
                user = JsonConvert.DeserializeObject<UserDto>(responseContent);
            }

            return user;
        }


        public async Task<UserDto> AddUser(UserDto user)
        {
            UserDto userDtoResponse = null;

            StringContent content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");

            // Sending request to find web api REST service resource to Add an User using HttpClient
            HttpResponseMessage response = await _httpClient.PostAsync($"api/Users", content);

            // Checking the response is successful or not which is sent using HttpClient
            if (response.IsSuccessStatusCode)
            {
                // Storing the content response recieved from web api
                var responseContent = response.Content.ReadAsStringAsync().Result;

                //Deserializing the response recieved from web api and storing into the Employee list
                userDtoResponse = JsonConvert.DeserializeObject<UserDto>(responseContent);
            }

            return userDtoResponse;
        }

        public async Task<UserDto> UpdateUser(UserDto user)
        {
            UserDto userDtoResponse = null;

            StringContent content = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");

            // Sending request to find web api REST service resource to Add an User using HttpClient
            HttpResponseMessage response = await _httpClient.PutAsync($"api/Users/{user.Id}", content);

            // Checking the response is successful or not which is sent using HttpClient
            if (response.IsSuccessStatusCode)
            {
                // Storing the content response recieved from web api
                var responseContent = response.Content.ReadAsStringAsync().Result;

                //Deserializing the response recieved from web api
                userDtoResponse = JsonConvert.DeserializeObject<UserDto>(responseContent);
            }

            return userDtoResponse;
        }

        public async Task<UserDto> DeleteUser(int id)
        {
            UserDto userDtoResponse = null;

            // Sending request to find web api REST service resource to Delete the User using HttpClient
            HttpResponseMessage response = await _httpClient.DeleteAsync($"api/Users/{id}");

            // Checking the response is successful or not which is sent using HttpClient
            if (response.IsSuccessStatusCode)
            {
                // Storing the content response recieved from web api
                var responseContent = response.Content.ReadAsStringAsync().Result;

                // Deserializing the response recieved from web api
                userDtoResponse = JsonConvert.DeserializeObject<UserDto>(responseContent);
            }

            return userDtoResponse;
        }




    }

}