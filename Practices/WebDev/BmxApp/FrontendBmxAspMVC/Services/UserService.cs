using FrontendBmxAspMVC.Interfaces;
using FrontendBmxAspMVC.Models;
using RestSharp;

namespace FrontendBmxAspMVC.Services;

public class UserService : IUserService
{
    //Vars
    private readonly RestClient _client;
    private readonly string? _token;

    //Constructor
    public UserService(RestClient client, IConfiguration config, IHttpContextAccessor httpContextAccessor)
    {
        _client = client;
        _token = httpContextAccessor.HttpContext?.User.FindFirst("AccessToken")?.Value;
        var apiBmxUrl = config.GetSection("AppSettings").GetSection("ApiBmxUrl").Value;

        // Init client config
        if (apiBmxUrl != null) _client = new RestClient(apiBmxUrl);
    }

    public async Task<IEnumerable<User>?> GetAllUsersAsync()
    {
        // GET All Users
        var request = new RestRequest($"User/");

        // Add token to request
        request.AddHeader("Authorization", $"Bearer {_token}");

        // Execute request
        var response = await _client.GetAsync<IEnumerable<User>>(request);

        // Return IEnumerable<User>
        return response;
    }

    public async Task<User?> GetUserByIdAsync(int id)
    {
        // GET User By Id
        var request = new RestRequest($"User/{id}");

        // Add token to request
        request.AddHeader("Authorization", $"Bearer {_token}");

        // Execute request
        var response = await _client.GetAsync<User>(request);

        // Return User
        return response;
    }

    public async Task<User?> CreateUserAsync(User user)
    {
        // POST User
        var request = new RestRequest($"User/");

        // Add token to request
        request.AddHeader("Authorization", $"Bearer {_token}");

        // Add body to request
        request.AddJsonBody(user);

        // Execute request
        var response = await _client.PostAsync<User>(request);

        // Return User
        return response;
    }

    public async Task<User?> UpdateUserAsync(int id, User user)
    {
        // PUT User
        var request = new RestRequest($"User/{id}");

        // Add token to request
        request.AddHeader("Authorization", $"Bearer {_token}");

        // Add id to request
        request.AddUrlSegment("id", id);

        // Add body to request
        request.AddJsonBody(user);

        // Execute request
        var response = await _client.PutAsync<User>(request);

        // Return User
        return response;
    }

    public async Task DeleteUserAsync(int id)
    {
        // DELETE User
        var request = new RestRequest($"User/{id}");

        // Add token to request
        request.AddHeader("Authorization", $"Bearer {_token}");

        // Execute request
        await _client.DeleteAsync<User>(request);
    }
}