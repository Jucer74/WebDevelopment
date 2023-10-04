using System.Collections.Generic;
using System.Threading.Tasks;
using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services
{
    public interface IAccountService
    {
        Task<Account> Create(Account account);

        Task<List<Account>> GetAll();

        Task<Account> GetById(int id);

        Task<Account> Update(int id, Account account);

        Task DeleteById(int id);

        Task<Account> Deposit(int id, decimal amount);

        Task<Account> Withdraw(int id, decimal amount);
    }
}
