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
        //Client
        _client = client;

        //APIURL
        var accountsAPIUrlst = appSettings.Value.AccountsAPIUrl;

        //Client Imit with APIURL
        if (accountsAPIUrlst != null) _client = new RestClient(accountsAPIUrlst);
    }

    
    public async Task<Account?> CreateAccountAsync(Account? account)
    {
        var request = new RestRequest(resource: "/api/v1/Accounts/");

        //JSON not null
        if (account == null)
        {
            return null;
        }

        //Serializar el objeto Acount a JSON
        var accountJson = JsonConvert.SerializeObject(account);

        //Agregar el JSON sereializado al cuerpo de la collection
        request.AddParameter(name: "application/json", accountJson, ParameterType.RequestBody);

        //Print Json body
        Console.WriteLine($"Request JSON Body Post: {accountJson}");

        //Execute request
        var response = await _client.PostAsync(request);

        if (response.IsSuccessful)
        {
            return response.IsSuccessStatusCode ? account : null;
        }
        else
        {
            //Manejar errores de solicitudes
            throw new ArgumentNullException(paramName: $"Error al crear la cuenta: {response.StatusCode}");
        }
    }

    //Function GetAllAccount
    public async Task<List<Account>?> GetAllAccountsAsync()
    {
        //GET Request with RestSharp
        var request = new RestRequest(resource: "/api/v1/Accounts/");
        var response = await _client.ExecuteAsync<List<Account>>(request);

        if (response.IsSuccessful)
        {
            return response.Data;
        }
        else
        {
            //Manejar errores de Solicitudes
            throw new ArgumentNullException(paramName: $"Error al obtener las cuentas: {response.StatusCode}");
        }
    }

    //Function GetAccountBYId
    public async Task<Account?> GetAccountByIdAsync(int id)
    {
        //GET Request with RestSharp
        var request = new RestRequest(resource: "/api/v1/Accounts/{id}");

        //Add id to request
        request.AddUrlSegment(name: "id", id);

        //Execute request
        var response = await _client.ExecuteAsync<Account>(request);

        if (response.IsSuccessful)
        {
            return response.Data;
        }
        else
        {
            //Manejar errores de solicitudes
            throw new ArgumentNullException(paramName: $"Error al obtener la cuenta: {response.StatusCode}");
        }
    }

    //Function UpdateAccount
    public async Task<Account?> UpdateAccountAsync(int id, Account? account)
    {
        //PUT Account by id
        var request = new RestRequest(resource: "/api/v1/Accounts/{id}");

        //Add id to request
        request.AddUrlSegment(name: "id", id);

        //Json not null
        if (account == null)
        {
            return null;
        }

        //Serializar el objecto account a JSON
        var accountJson = JsonConvert.SerializeObject(account);

        //Agregar el JSON sereializado al cuerpo de la collection
        request.AddParameter(name: "application/json", accountJson, ParameterType.RequestBody);

        //Print Json body
        Console.WriteLine($"Request JSON Body Put: {accountJson}");

        //execute request
        var response = await _client.PutAsync(request);

        if (response.IsSuccessful)
        {
            return response.IsSuccessStatusCode ? account : null;
        }
        else
        {
            //Manejar errores de solicitudes
            throw new ArgumentNullException(paramName: $"Error al actualizar las cuenta: {response.StatusCode}");
        }
    }

    //Function Delete Account
    public async Task DeleteAccountAsync(int id)
    {
        //Delete Student by id with RestSharp
        var request = new RestRequest(resource: "/api/v1/Accounts/{id}");

        //Add id to request
        request.AddUrlSegment(name: "id", id);

        //Execute Request
        var response = await _client.DeleteAsync(request);

        if (!response.IsSuccessful)
        {
            //Manejar errores de Solicitudes
            throw new ArgumentNullException(paramName: $"Error al eliminar la cuenta: {response.StatusCode}");
        }
    }

    //Function Deposit Account
    public async Task<bool> DepositToAccountAsync(int id, decimal amount)
    {
        try
        {
            var depositData = new { amount };
            var depositJson = JsonConvert.SerializeObject(depositData);

            var request = new RestRequest($"/api/v1/Accounts/{id}/deposit");

            request.AddHeader("Content-Type", "application/json");

            request.AddParameter("application/json", depositJson, ParameterType.RequestBody);

            var response = await _client.PostAsync(request);

            if (!response.IsSuccessful)
            {
                //Manejar errores de Solicitudes
                throw new ArgumentNullException(paramName: $"Error al depositar cuenta: {response.StatusCode}");
            }

            return true;
        }
        catch (Exception ex)
        {
            throw new ArgumentNullException(paramName: $"Error al depositar cuenta: {ex.Message}");
        }
    }

    //Function Withdraw Account
    public async Task<bool> WithdrawFromAccountAsync(int id, decimal amount)
    {
        try
        {
            var withdrawData = new { amount };
            var withdrawJson = JsonConvert.SerializeObject(withdrawData);

            var request = new RestRequest($"/api/v1/Accounts/{id}/withdraw");

            request.AddHeader("Content-Type", "application/json");

            request.AddParameter("application/json", withdrawJson, ParameterType.RequestBody);

            var response = await _client.PostAsync(request);

            if (!response.IsSuccessful)
            {
                //Manejar errores de Solicitudes
                throw new ArgumentNullException(paramName: $"Error al retirar cuenta: {response.StatusCode}");
            }

            return true;
        }
        catch (Exception ex)
        {
            throw new ArgumentNullException(paramName: $"Error al retirar cuenta: {ex.Message}");
        }
    }
}

    



