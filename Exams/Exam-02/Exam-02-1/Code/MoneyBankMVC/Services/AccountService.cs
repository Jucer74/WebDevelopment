using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public class AccountService : IAccountService
{
    private static List<Account> accountList = LoadAccounts();

    public int AccountIndex { get; private set; }

    public AccountService()
    {

    }
    public Account Create(Account account)
    {
        account.Id = GetNextSecuenceId();
        accountList.Add(account);
        return account;
    }

    public void DeleteById(int id)
    {
        var accountOriginal = accountList.FirstOrDefault(x => x.Id == id + 1);
        if (accountOriginal == null)
        {
            throw new Exception("Not Found");
        }
    }

    public List<Account> GetAll()
    {
        return accountList;
    }

    public Account GetById(int id)
    {
        var account = accountList.FirstOrDefault(x => x.Id == id);
        return account;
    }

    public Account Update(int id, Account account)
    {
        var accountInList = accountList.FirstOrDefault(x => x.Id == id);
        var accountIndex = accountList.IndexOf(accountInList);
        accountInList = account;
        accountList[accountIndex] = accountInList;

        return accountInList;
    }

    private static List<Account> LoadAccounts()
    {
        List<Account> account = new List<Account>();

        account.Add(new Account() { Id = 1, AcountType = "A", AccountNumber = 2, OwnerName = "Gerardo", BalanceAmount = 18, OverdraftAmount = 2 });
        account.Add(new Account() { Id = 2, AcountType = "C", AccountNumber = 5, OwnerName = "Paolo", BalanceAmount = 6, OverdraftAmount = 1 });
        account.Add(new Account() { Id = 3, AcountType = "A", AccountNumber = 2, OwnerName = "Valirio", BalanceAmount = 10, OverdraftAmount = 22 });

        return account;
    }

    private int GetNextSecuenceId()
    {
        var nextSecuenceId = accountList.Max(x => x.Id) + 1;
        return nextSecuenceId;

    }

}
