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
    public class LibrosService
    {
        private string BaseUrl { get; }
        private HttpClient _httpClient;

        public LibrosService(string baseUrl)
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

        public async Task<List<LibroDto>> GetLibros()
        {
            var librosList = new List<LibroDto>();

            HttpResponseMessage response = await _httpClient.GetAsync("api/Libros");

            if (response.IsSuccessStatusCode)
            {
                var responseContent = response.Content.ReadAsStringAsync().Result;
                librosList = JsonConvert.DeserializeObject<List<LibroDto>>(responseContent);
            }

            return librosList;
        }

        public async Task<LibroDto> GetLibroById(int id)
        {
            LibroDto libro = null;

            HttpResponseMessage response = await _httpClient.GetAsync($"api/Libros/{id}");

            if (response.IsSuccessStatusCode)
            {
                var responseContent = response.Content.ReadAsStringAsync().Result;
                libro = JsonConvert.DeserializeObject<LibroDto>(responseContent);
            }

            return libro;
        }

        public async Task<LibroDto> AddLibro(LibroDto libro)
        {
            LibroDto libroDtoResponse = null;

            StringContent content = new StringContent(JsonConvert.SerializeObject(libro), Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _httpClient.PostAsync($"api/Libros", content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = response.Content.ReadAsStringAsync().Result;
                libroDtoResponse = JsonConvert.DeserializeObject<LibroDto>(responseContent);
            }

            return libroDtoResponse;
        }

        public async Task<LibroDto> UpdateLibro(LibroDto libro)
        {
            LibroDto libroDtoResponse = null;

            StringContent content = new StringContent(JsonConvert.SerializeObject(libro), Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _httpClient.PutAsync($"api/Libros/{libro.Id}", content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = response.Content.ReadAsStringAsync().Result;
                libroDtoResponse = JsonConvert.DeserializeObject<LibroDto>(responseContent);
            }

            return libroDtoResponse;
        }

        public async Task<LibroDto> DeleteLibro(int id)
        {
            LibroDto libroDtoResponse = null;

            HttpResponseMessage response = await _httpClient.DeleteAsync($"api/Libros/{id}");

            if (response.IsSuccessStatusCode)
            {
                var responseContent = response.Content.ReadAsStringAsync().Result;
                libroDtoResponse = JsonConvert.DeserializeObject<LibroDto>(responseContent);
            }

            return libroDtoResponse;
        }
    }
}
