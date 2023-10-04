using MoneyBankMVC.Models;

public interface IAccountService
{
    IEnumerable<Accounts> GetAllAccounts();
    Accounts GetAccountById(int id);
    void CreateAccount(Accounts account);
    void UpdateAccount(Accounts account);
    void DeleteAccount(int id);
}
