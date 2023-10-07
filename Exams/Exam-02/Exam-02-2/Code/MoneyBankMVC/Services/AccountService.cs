using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Context;
using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public class AccountService : IAccountService
{
    private const int MAX_OVERDRAFT  = 1000000;
    private readonly AppDbContext _context;

    public AccountService(AppDbContext context)
    {
        _context = context;
    }

    public bool Create(Account account)
    {
        if (account.BalanceAmount > 0)
        {
            account.Id = AutoIncrementId();
            account.CreationDate = DateTime.Now;
            if(account.AccountType == 'C')
            {

                account.BalanceAmount += MAX_OVERDRAFT;

                if(account.BalanceAmount < MAX_OVERDRAFT)
                {
                    account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
                }

            }
            _context.Add(account);
            _context.SaveChanges();
            return true;
        }

        return false;
    }

    //Funcion para colocar el Id diferente
    private int AutoIncrementId()
    {
        var Id = _context.Accounts.Max(e => e.Id) + 1;
        return Id;
    }

    public void Delete(int id, Account account)
    {

        var accountToDelete = GetById(id);

        if (accountToDelete != null)
        {
            _context.Remove(accountToDelete);
            _context.SaveChanges();
        }

    }

    public void Deposit(int id, Account account, decimal deposit)
    {
        account.BalanceAmount += deposit;

        if(account.AccountType == 'C')
        {
            if (account.OverdraftAmount > 0 && account.BalanceAmount < MAX_OVERDRAFT)
            {
                account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
            }
            else
            {
                account.OverdraftAmount = 0;
            }
        }
        

        Edit(id, account);
    }

    public void Edit(int id, Account account)
    {
        _context.Update(account);
        _context.SaveChanges();
    }

    public List<Account> GetAll()
    {
        return _context.Set<Account>().ToList<Account>();
    }

    public Account GetById(int id)
    {
        var account = _context.Accounts.FirstOrDefault<Account>(account => account.Id == id);
        return account!;
    }

    public bool Withdrawal(int id, Account account, decimal withdrawal)
    {
        if (withdrawal <= account.BalanceAmount)
        {
            account.BalanceAmount -= withdrawal;

            if (account.AccountType == 'C')
            {
                account.BalanceAmount -= withdrawal;

                if (account.OverdraftAmount > 0 && account.BalanceAmount < MAX_OVERDRAFT)
                {
                    account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
                }
                Edit(id, account);
                return (true);
            }
            else
            {
                Edit(id, account);
                return (true);
            }
        }
        else
        {
            return (false);
        }
    }

    public bool AccountExists(string accountNumber)
    {
        return (_context.Accounts?.Any(e => e.AccountNumber == accountNumber)).GetValueOrDefault();
    }
}
