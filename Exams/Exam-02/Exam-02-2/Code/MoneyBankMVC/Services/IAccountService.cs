using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    Task<List<Account>> GetAccountsAsync();

    Task CreateAccountAsync(Account account);

    Task EditAccountAsync(int id, Account account);

    Task DeleteAccountAsync(Account account);

    Task DepositAsync(Account account, Transaction transaction);

    bool AccountExists(int id);

    Task<Account> FindAccountAsync(int? id);

}

