using FrontendBmxAspMVC.Dtos;
using FrontendBmxAspMVC.Interfaces;
using NuGet.Protocol;
using RestSharp;

namespace FrontendBmxAspMVC.Services;

public class AuthService : IAuthService
{
    //Vars
    private readonly RestClient _client;

    //Constructor
    public AuthService(RestClient client, IConfiguration config)
    {
        _client = client;
        var apiBmxUrl = config.GetSection("AppSettings").GetSection("ApiBmxUrl").Value;

        // Client init config
        if (apiBmxUrl != null) _client = new RestClient(apiBmxUrl);
    }

    //Methods
    // Function Auth
    public async Task<object?> Auth(AuthDto authDto)
    {
        var request = new RestRequest($"Auth/login");

        // Add the body
        request.AddJsonBody(authDto);

        // Execute the request
        var response = await _client.PostAsync<object>(request);

        // Return the authDto
        return response;
    }

    // Function Register
    public async Task<RegisterDto?> Register(RegisterDto registerDto)
    {
        // POST Register
        var request = new RestRequest($"Auth/register");

        // Add the body
        request.AddJsonBody(registerDto);

        // Execute the request
        var response = await _client.PostAsync<RegisterDto>(request);

        // Return the registerDto
        return response;
    }
}