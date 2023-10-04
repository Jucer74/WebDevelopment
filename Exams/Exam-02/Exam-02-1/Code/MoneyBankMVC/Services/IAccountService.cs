using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

using System.Collections.Generic;
using System.Threading.Tasks;
using MoneyBankMVC.Models;

public interface IAccountService
{
    Task<IEnumerable<AccountModel>> ListAccountsAsync();
    Task<bool> CreateAccountAsync(AccountModel account);
    Task<AccountModel> GetAccountByIdAsync(int id);
    Task<bool> EditAccountAsync(AccountModel account);
    Task<bool> DepositToAccountAsync(int id, decimal amount);
    Task<bool> WithdrawFromAccountAsync(int id, decimal amount);
    Task<bool> DeleteAccountAsync(int id);
}
