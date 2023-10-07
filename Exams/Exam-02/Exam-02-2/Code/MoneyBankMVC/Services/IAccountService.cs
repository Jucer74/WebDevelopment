using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    List<Account> GetAll();

    bool Create(Account account);

    void Edit(int id, Account account);

    void Deposit(int id, Account account, decimal depositAmount);

    bool Withdrawal(int id, Account account, decimal withdrawal);

    Account GetById(int id);

    void Delete(int id, Account account);
}