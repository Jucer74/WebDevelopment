using MoneyBankMVC.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    Task<IEnumerable<Account>> GetAllAccounts();
    Task<Account> GetAccountById(int id);
    Task CreateAccount(Account account);
    Task UpdateAccount(Account account);
    Task DeleteAccount(int id);
    Task<bool> Deposit(Transaction transaction);
    Task<bool> Withdrawal(Transaction transaction, Account account);
    Task<bool> AccountNumberExists(string accountNumber);


}