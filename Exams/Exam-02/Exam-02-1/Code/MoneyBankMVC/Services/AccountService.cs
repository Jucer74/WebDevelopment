using Microsoft.Extensions.Options;
using MoneyBankMVC.Models;
using MoneyBankMVC.Settings;
using Newtonsoft.Json;
using RestSharp;
using System.Security.Principal;

namespace MoneyBankMVC.Services;

public class AccountService : IAccountService
{
    private readonly RestClient _client;

    public AccountService(IOptions<AppSettings> appSettings, RestClient client)
    {
        _client = client;

        var AccountsAPIUrl = appSettings.Value.AccountsAPIUrl;

        if (AccountsAPIUrl != null ) _client = new RestClient(AccountsAPIUrl);
    }

    public async Task<List<Account>?> GetAllAccountsAsync()
    {
        var request = new RestRequest(resource: "Accounts/");

        var response = await _client.ExecuteAsync<List<Account>>(request);

        if (response.IsSuccessful)
        {
            return response.Data;
        }
        else
        {
            throw new ArgumentNullException(paramName: $"Error al obtener cuentas: {response.StatusCode}");
        }
    }

    public async Task<Account?> GetAccountByIdAsync(int id)
    {
        var request = new RestRequest(resource: "Accounts/{id}");

        request.AddUrlSegment(name: "id", id);

        var response = await _client.ExecuteAsync<Account>(request);

        if (response.IsSuccessful)
        {
            return response.Data;
        }
        else
        {
            throw new ArgumentNullException(paramName: $"Error al obtener cuenta: {response.StatusCode}");
        }
    }

    public async Task<Account?> CreateAccountAsync(Account? account)
    {
        var request = new RestRequest(resource:"Accounts/");

        if (account == null) 
        {
            return null;
        }

        var accountJson = JsonConvert.SerializeObject(account);

        request.AddParameter(name: "application/json", accountJson, ParameterType.RequestBody);

        Console.WriteLine($"Request JSON Body Post: {accountJson}");

        var response = await _client.PostAsync(request);

        if (response.IsSuccessful) 
        {
            return response.IsSuccessStatusCode ? account : null;
        }
        else
        {
            throw new ArgumentNullException(paramName: $"Error al crear cuenta: {response.StatusCode}");
        }
    }

    public async Task<Account?> UpdateAccountAsync(int id, Account? account)
    {
        var request = new RestRequest(resource: "Accounts/{id}");

        request.AddUrlSegment(name: "id", id);


        if (account == null)
        {
            return null;
        }
        
        var accountJson = JsonConvert.SerializeObject(account);

        request.AddParameter(name: "application/json", accountJson, ParameterType.RequestBody);

        Console.WriteLine($"Request JSON Body Put: {accountJson}");

        var response = await _client.PutAsync(request);

        if (response.IsSuccessful)
        {
            return response.IsSuccessStatusCode ? account : null;
        }  
        else
        {
            throw new ArgumentNullException(paramName: $"Error al actualizar cuenta: {response.StatusCode}");
        }
    }

    public async Task DeleteAccountAsync(int id)
    {
        var request = new RestRequest(resource: "Accounts/{id}");

        request.AddUrlSegment(name: "id", id);

        var response = await _client.DeleteAsync(request);

        if (!response.IsSuccessful)
        {
            throw new ArgumentNullException(paramName: $"Error al eliminar cuenta: {response.StatusCode}");
        }
    }
}
