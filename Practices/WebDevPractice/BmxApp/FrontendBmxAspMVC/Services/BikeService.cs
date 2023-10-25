using FrontendBmxAspMVC.Interfaces;
using FrontendBmxAspMVC.Models;
using RestSharp;

namespace FrontendBmxAspMVC.Services;

public class BikeService : IBikeService
{
    //Vars
    private readonly RestClient _client;
    private readonly string? _token;

    //Constructor
    public BikeService(RestClient client, IConfiguration config, IHttpContextAccessor httpContextAccessor)
    {
        _client = client;
        _token = httpContextAccessor.HttpContext?.User.FindFirst("AccessToken")?.Value;
        var apiBmxUrl = config.GetSection("AppSettings").GetSection("ApiBmxUrl").Value;

        // Init client config
        if (apiBmxUrl != null) _client = new RestClient(apiBmxUrl);
    }

    public async Task<IEnumerable<Bike>?> GetAllBikesAsync()
    {
        // GET All Bikes
        var request = new RestRequest($"Bike/");

        // Add token to request
        request.AddHeader("Authorization", $"Bearer {_token}");

        // Execute request
        var response = await _client.GetAsync<IEnumerable<Bike>>(request);

        // Return IEnumerable<Bike>
        return response;
    }

    public async Task<Bike?> GetBikeByIdAsync(int id)
    {
        // GET Bike By Id
        var request = new RestRequest($"Bike/{id}");

        // Add token to request
        request.AddHeader("Authorization", $"Bearer {_token}");

        // Execute request
        var response = await _client.GetAsync<Bike>(request);

        // Return Bike
        return response;
    }

    public async Task<Bike?> CreateBikeAsync(Bike bike)
    {
        // POST Bike
        var request = new RestRequest($"Bike/");

        // Add token to request
        request.AddHeader("Authorization", $"Bearer {_token}");

        // Add body to request
        request.AddJsonBody(bike);

        // Execute request
        var response = await _client.PostAsync<Bike>(request);

        // Return Bike
        return response;
    }

    public async Task<Bike?> UpdateBikeAsync(int id, Bike bike)
    {
        // PUT Bike
        var request = new RestRequest($"Bike/{id}");

        // Add token to request
        request.AddHeader("Authorization", $"Bearer {_token}");

        // Add id to request
        request.AddUrlSegment("id", id);

        // Add body to request
        request.AddJsonBody(bike);

        // Execute request
        var response = await _client.PutAsync<Bike>(request);

        // Return Bike
        return response;
    }

    public async Task DeleteBikeAsync(int id)
    {
        // DELETE Bike
        var request = new RestRequest($"Bike/{id}");

        // Add token to request
        request.AddHeader("Authorization", $"Bearer {_token}");

        // Execute request
        await _client.DeleteAsync<Bike>(request);
    }
}