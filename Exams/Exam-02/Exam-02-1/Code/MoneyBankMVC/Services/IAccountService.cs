using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    Task Create(Account account);
    Task Deposit(int id, decimal amount);
    Task Edit(int id, Account account);
    Task Delete(int id);
    Task Withdraw(int id, decimal amount);
    public Task<Account?> GetAccountByIdAsync(int? id);
    public bool AccountExists(int id);
}