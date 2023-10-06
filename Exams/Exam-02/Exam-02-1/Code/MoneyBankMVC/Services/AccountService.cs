using MoneyBankMVC.Models;
using Newtonsoft.Json;
using RestSharp;

namespace MoneyBankMVC.Services;

public class AccountService // : IAccountService
{
    private readonly RestClient _client;
    private readonly string? _baseUrl;
    private readonly IConfiguration _configuration;

    public AccountService(RestClient rclient, IConfiguration config)
    {
        _configuration = config;
        _baseUrl = config.GetSection("AccountsAPIUrl").Value;
        _client = rclient;
    }

    public async Task<List<Account>> GetAll()
    {
        var allAccounts =  await GetAllAccounts();
        return allAccounts;
    }

    private async Task<List<Account>> GetAllAccounts()
    {
        var req = new RestRequest($"{_baseUrl}/Accounts"); // default method is GET
        var res = await _client.GetAsync(req);
        
        List<Account>? accounts = JsonConvert.DeserializeObject<List<Account>>(res.Content!);
        return accounts!;
    }
    
    public async Task<Account> GetById(int id)
    {
        var account = await GetAccountById(id);
        return account;
    }

    private async Task<Account> GetAccountById(int id)
    {
        var req = new RestRequest($"{_baseUrl}/Accounts/{id}"); //,Method.Get);
        var res = await _client.GetAsync(req);
        
        Account? account = JsonConvert.DeserializeObject<Account>(res.Content!);
        return account!;
    }
    
    
    public async Task<Account> CreateAccount(Account account)
    {
        var createdAccount = await PostAccount(account);
        return createdAccount;
    }
    
    private async Task<Account> PostAccount(Account account)
    {
        var req = new RestRequest($"{_baseUrl}/Accounts", Method.Post);
        req.AddJsonBody(account);
        var res = await _client.PostAsync(req);
        Console.WriteLine(res.Content);
        Console.WriteLine((char)res.StatusCode);
        Console.WriteLine(res.ErrorMessage);
        Console.WriteLine(res.ErrorException?.Message);
        Console.WriteLine(account.ToString());
        
        Account? createdAccount = JsonConvert.DeserializeObject<Account>(res.Content!);
        return createdAccount!;
    }
    
    public async Task<Account> UpdateAccount(Account account)
    {
        var updatedAccount = await PutAccount(account);
        return updatedAccount;
    }
    
    private async Task<Account> PutAccount(Account account)
    {
        var req = new RestRequest($"{_baseUrl}/Accounts/{account.Id}", Method.Put);
        req.AddJsonBody(account);
        var res = await _client.PutAsync(req);
        
        Account? updatedAccount = JsonConvert.DeserializeObject<Account>(res.Content!);
        return updatedAccount!;
    }
    
    public async Task<bool> Delete(int id)
    {
        var deleted = await DeleteAccount(id);
        return deleted;
    }
    
    private async Task<bool> DeleteAccount(int id)
    {
        var req = new RestRequest($"{_baseUrl}/Accounts/{id}", Method.Delete);
        var res = await _client.DeleteAsync(req);
        
        return res.IsSuccessStatusCode;
    }
    
    public async Task<bool> Deposit(int id, decimal amount)
    {
        var deposited = await DepositAccount(id, amount);
        return deposited;
    }
    
    private async Task<bool> DepositAccount(int id, decimal amount)
    {
        var req = new RestRequest($"{_baseUrl}/Accounts/{id}/Deposit/{amount}", Method.Put);
        var res = await _client.PutAsync(req);
        
        return res.IsSuccessStatusCode;
    }
    
    public async Task<bool> Withdraw(int id, decimal amount)
    {
        var withdrawn = await WithdrawAccount(id, amount);
        return withdrawn;
    }
    
    private async Task<bool> WithdrawAccount(int id, decimal amount)
    {
        var req = new RestRequest($"{_baseUrl}/Accounts/{id}/Withdraw/{amount}", Method.Put);
        var res = await _client.PutAsync(req);
        
        return res.IsSuccessStatusCode;
    }




    
    
    
    
    
    

 
}
