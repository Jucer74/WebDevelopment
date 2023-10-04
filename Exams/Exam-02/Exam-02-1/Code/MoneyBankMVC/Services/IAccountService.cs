using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    Task<List<Account>?> GetAllAccountsAsync();
    Task<Account?> GetAccountByIdAsync(int id);
    Task<Account?> CreateAccountAsync(Account? account);
    Task<Account?> UpdateAccountAsync(int id, Account? account);
    Task DeleteAccountAsync(int id);
}