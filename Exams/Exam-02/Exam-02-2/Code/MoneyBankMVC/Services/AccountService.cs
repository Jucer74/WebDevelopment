using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Context;
using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public class AccountService : IAccountService
{

    private readonly AppDbContext _context;

    public AccountService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Account>> GetAllAccountsAsync()
    {
        return await _context.Accounts.ToListAsync();
    }

    public async Task<Account> GetAccountByIdAsync(int id)
    {
        return await _context.Accounts.FindAsync(id);
    }

    public async Task CreateAccountAsync(Account account)
    {
        _context.Add(account);
        await _context.SaveChangesAsync();
    }

    public async Task EditAccountAsync(Account account)
    {
        _context.Update(account);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAccountAsync(int id)
    {
        var account = await _context.Accounts.FindAsync(id);
        if (account != null)
        {
            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<Transaction> GetTransactionByIdAsync(int id)
    {
        var account = await _context.Accounts.FindAsync(id);
        if (account == null)
        {
            return null;
        }

        return MapTransaction(account);
    }

    public async Task UpdateTransactionAsync(Transaction transaction)
    {
        var account = MapAccount(transaction);

        _context.Update(account);
        await _context.SaveChangesAsync();
    }


    public async Task UpdateWithdrawalAsync(Transaction transaction)
    {
        var account = MapAccountWithdrawal(transaction);

        _context.Update(account);
        await _context.SaveChangesAsync();
    }


    private Account MapAccount(Transaction transaction)
    {
        Account account = new Account();

        account.Id = transaction.Id;
        account.AccountType = transaction.AccountType;
        account.CreationDate = transaction.CreationDate;
        account.AccountNumber = transaction.AccountNumber;
        account.OwnerName = transaction.OwnerName;
        account.BalanceAmount = transaction.BalanceAmount;
        account.OverdraftAmount = transaction.OverdraftAmount;
        decimal MAX_OVERDRAFT = 1000000;

        if (account.AccountType == 'A')
        {

            account.BalanceAmount += transaction.ValueAmount;

        }
        else
        {

            account.BalanceAmount += transaction.ValueAmount;


            if (account.OverdraftAmount > 0 && account.BalanceAmount < MAX_OVERDRAFT)
            {
                account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
            }
            else
            {
                account.OverdraftAmount = 0;
            }


        }

        return account;

    }


    private Account MapAccountWithdrawal(Transaction transaction)
    {
        Account account = new Account();

        account.Id = transaction.Id;
        account.AccountType = transaction.AccountType;
        account.CreationDate = transaction.CreationDate;
        account.AccountNumber = transaction.AccountNumber;
        account.OwnerName = transaction.OwnerName;
        account.BalanceAmount = transaction.BalanceAmount;
        account.OverdraftAmount = transaction.OverdraftAmount;

        decimal MAX_OVERDRAFT = 1000000;

        if (account.AccountType == 'A')
        {

            if (transaction.ValueAmount <= account.BalanceAmount)
            {
                account.BalanceAmount -= transaction.ValueAmount;
}
            else
            {
                return null;
            }

        }
        else
        {

            if (transaction.ValueAmount <= account.BalanceAmount)
            {
                account.BalanceAmount -= transaction.ValueAmount;

                if (account.OverdraftAmount > 0 && account.BalanceAmount < MAX_OVERDRAFT)
                {
                    account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
                }
            }
            else
            {
                return null;
            }

        }

        return account;

    }

    private Transaction MapTransaction(Account account)
    {
        Transaction transaction = new Transaction();

        transaction.Id = account.Id;
        transaction.AccountType = account.AccountType;
        transaction.CreationDate = account.CreationDate;
        transaction.AccountNumber = account.AccountNumber;
        transaction.OwnerName = account.OwnerName;
        transaction.BalanceAmount = account.BalanceAmount;
        transaction.OverdraftAmount = account.OverdraftAmount;

        return transaction;
    }

    public async Task<bool> AccountExists(string accountNumber)
    {
        return await _context.Accounts.AnyAsync(a => a.AccountNumber == accountNumber);
    }



    public List<Account> GetAll()
    {
        throw new NotImplementedException();
    }
}
