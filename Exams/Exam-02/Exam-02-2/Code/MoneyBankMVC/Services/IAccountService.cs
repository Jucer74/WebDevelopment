using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    Task<List<Account>> GetAllAccountsAsync();
    Task<Account> GetAccountByIdAsync(int id);
    List<Account> GetAll();
    Task CreateAccountAsync(Account account);
    Task EditAccountAsync(Account account);
    Task DeleteAccountAsync(int id);
    Task<Transaction> GetTransactionByIdAsync(int id);
    Task UpdateTransactionAsync(Transaction transaction);
    Task UpdateWithdrawalAsync(Transaction transaction);
    Task<bool> AccountExists(string accountNumber);


}