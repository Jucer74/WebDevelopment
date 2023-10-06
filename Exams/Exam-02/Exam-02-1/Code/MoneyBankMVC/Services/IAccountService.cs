using MoneyBankMVC.Models;
// using RestSharp;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    private Task<List<Account>> GetAllAccounts()
    {
        throw new NotImplementedException();
    }

    Task<List<Account>> GetAll();
    
    private Task<Account> GetAccountById(int id)
    {
        throw new NotImplementedException();
    }
    Task<Account> GetById(int id);
    
    
    private Task<Account> PostAccount(Account account)
    {
        throw new NotImplementedException();
    }
    Task<Account> CreateAccount(Account account);
    
    private Task<Account> PutAccount(Account account)
    {
        throw new NotImplementedException();
    }
    Task<Account> UpdateAccount(Account account);
    
    
    private Task<bool> DeleteAccount(int id)
    {
        throw new NotImplementedException();
    }
    Task<bool> Delete(int id);
    
    
}