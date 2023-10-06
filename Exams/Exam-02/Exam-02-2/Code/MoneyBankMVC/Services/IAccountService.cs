using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    Task<List<Account>> GetAccountsAsync();
    Task<Account> GetAccountByIdAsync(int id);
    Task<bool> CreateAccountAsync(Account account);
    Task<bool> UpdateAccountAsync(Account account);
    Task<bool> DeleteAccountAsync(int id);
    Task<bool> DepositAsync(int id, decimal amount);
    Task<bool> WithdrawalAsync(int id, decimal amount);
}