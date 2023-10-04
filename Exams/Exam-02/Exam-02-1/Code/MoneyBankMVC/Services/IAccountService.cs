using MoneyBankMVC.Models;

public interface IAccountService
{
    IEnumerable<Account> GetAllAccounts();
    Account GetAccountById(int id);
    void CreateAccount(Account account);
    void UpdateAccount(Account account);
    void DeleteAccount(int id);
}
