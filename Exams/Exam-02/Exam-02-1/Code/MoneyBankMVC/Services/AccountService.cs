using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MoneyBankMVC.Models;
using MoneyBankMVC.Services;
using RestSharp;

public class AccountService : IAccountService
{
    private readonly RestClient _client;

    public AccountService()
    {
        _client = new RestClient("http://127.0.0.1:8000");
    }

    public async Task<IEnumerable<AccountModel>> ListAccountsAsync()
    {
        var request = new RestRequest("/api/v1/accounts", Method.Get);
        var response = await _client.ExecuteAsync<List<AccountModel>>(request);

        if (response.IsSuccessful)
        {
            return response.Data;
        }
        else
        {
            throw new Exception("Failed to list accounts.");
        }
    }

    public async Task<bool> CreateAccountAsync(AccountModel account)
    {
        RestRequest request = new RestRequest("/api/v1/accounts", Method.Post);
        request.AddJsonBody(account);

        var response = await _client.ExecuteAsync(request);

        return response.IsSuccessful;
    }

    public async Task<AccountModel> GetAccountByIdAsync(int id)
    {
        var request = new RestRequest($"/api/v1/accounts/{id}", Method.Get);
        var response = await _client.ExecuteAsync<AccountModel>(request);

        if (response.IsSuccessful)
        {
            return response.Data;
        }
        else
        {
            throw new Exception($"Failed to get account with ID {id}.");
        }
    }

    public async Task<bool> EditAccountAsync(int id, AccountModel account)
    {
        var request = new RestRequest($"/api/v1/accounts/{id}", Method.Put);
        request.AddJsonBody(account);

        var response = await _client.ExecuteAsync(request);

        return response.IsSuccessful;
    }

    public async Task<bool> DepositToAccountAsync(int id, decimal amount)
    {
        var request = new RestRequest($"/api/v1/accounts/{id}/deposit?amount={amount}", Method.Post);

        var response = await _client.ExecuteAsync(request);

        return response.IsSuccessful;
    }

    public async Task<bool> WithdrawFromAccountAsync(int id, decimal amount)
    {
        var request = new RestRequest($"/api/v1/accounts/{id}/withdraw?amount={amount}", Method.Post);

        var response = await _client.ExecuteAsync(request);

        return response.IsSuccessful;
    }

    public async Task<bool> DeleteAccountAsync(int id)
    {
        var request = new RestRequest($"/api/v1/accounts/{id}", Method.Delete);

        var response = await _client.ExecuteAsync(request);

        return response.StatusCode == System.Net.HttpStatusCode.NoContent;
    }

    public Task<bool> EditAccountAsync(AccountModel account)
    {
        throw new NotImplementedException();
    }
}
