using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    Task<List<Account>> GetAccountsAsync();

    Task<Account> CreateAccountAsync(Account account);

    //Task<Account> Edit1AccountAsync(Account account);

}

