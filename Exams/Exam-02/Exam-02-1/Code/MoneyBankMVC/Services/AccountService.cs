using MoneyBankMVC.Models;
using RestSharp;
using System.Security.Principal;

namespace MoneyBankMVC.Services;

public class AccountService : IAccountService
{
    private readonly RestClient _restClient;

    public AccountService()
    {
        _restClient = new RestClient("AccountsAPIUrl");
    }

    public async Task<List<Account>> GetAllAccounts()
    {
        var request = new RestRequest("/Accounts", Method.Get);

        var response = await _restClient.ExecuteAsync<List<Account>>(request);

        if (response.IsSuccessful)
        {
            List<Account> accounts = response.Data;
            return accounts;
        }
        else
        {
            string errorMessage = response.ErrorMessage;
            throw new Exception(errorMessage);
        }
    }

    public async Task<Account> GetAccountById(int id)
    {
        var request = new RestRequest($"/Accounts/{id}", Method.Get);

        var response = await _restClient.ExecuteAsync<Account>(request);

        if (response.IsSuccessful)
        {
            Account account = response.Data;
            return account;
        }
        else
        {
            string errorMessage = response.ErrorMessage;
            throw new Exception(errorMessage);
        }
    }

    public async Task<Account> CreateAccount(Account account)
    {
        var request = new RestRequest("/Accounts", Method.Post);
        request.AddJsonBody(account);

        var response = await _restClient.ExecuteAsync<Account>(request);

        if (response.IsSuccessful)
        {
            Account newAccount = response.Data;
            return newAccount;
        }
        else
        {
            string errorMessage = response.ErrorMessage;
            throw new Exception(errorMessage);
        }
    }

    public async Task<Account> UpdateAccount(int id, Account account)
    {
        var request = new RestRequest($"/Accounts/{id}", Method.Put);
        request.AddJsonBody(account);

        var response = await _restClient.ExecuteAsync<Account>(request);

        if (response.IsSuccessful)
        {
            Account updatedAccount = response.Data;
            return updatedAccount;
        }
        else
        {
            string errorMessage = response.ErrorMessage;
            throw new Exception(errorMessage);
        }
    }

    public async Task<bool> DeleteAccount(int id)
    {
        var request = new RestRequest($"/Accounts/{id}", Method.Delete);

        var response = await _restClient.ExecuteAsync(request);

        if (response.IsSuccessful)
        {
            return true;
        }
        else
        {
            string errorMessage = response.ErrorMessage;
            throw new Exception(errorMessage);
        }
    }
}
}
