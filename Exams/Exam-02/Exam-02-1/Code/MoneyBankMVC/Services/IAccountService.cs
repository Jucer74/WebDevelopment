using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    Task<Account?> GetAccountByIdAsync(int id);
    Task<IEnumerable<Account>> GetAllAccountsAsync();
    Task CreateAccountAsync(Account account);
    Task UpdateAccountAsync(Account account);
    Task DeleteAccountAsync(int id);
    Task DepositAsync(int id, decimal amount);
    Task WithdrawAsync(int id, decimal amount);
    Task<bool> AccountExistsAsync(int id);
}