using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    Account Create(Account account);

    List<Account> GetAll();

    Account GetById(int id);

    Account Update(int id, Account account);

    void DeleteById(int id);

}