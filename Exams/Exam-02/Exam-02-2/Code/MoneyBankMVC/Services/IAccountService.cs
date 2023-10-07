using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    Task<List<Account>> GetAccountsAsync();
    Task<Account> GetAccountByIdAsync(int id);
    Task CreateAccountAsync(Account account);

    Task UpdateAccountAsync(Account account);
    Task DeleteAccountAsync(int id);
    bool AccountNumberExists(string accountNumber);



    Task<Transaction> GetTransactionForDepositAsync(int accountId);
    Task WithdrawalFundsAsync(Transaction transaction);
    Task DepositFundsAsync(Transaction transaction);
    List<Account> GetAll();
}