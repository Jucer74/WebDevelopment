using MoneyBankMVC.Models;
using MoneyBankMVC.Context;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MoneyBankMVC.Services;

public class AccountService : IAccountService

    //AÑADIENDO EL CONTEXTO QUE LLAMA A LA BASE DE DATOS
{
    private readonly AppDbContext _context;
    public AccountService(AppDbContext context)
    {
        _context = context;
    }


    // GET ALL DE LAS CUENTAS
    public async Task<IEnumerable<Account>> GetAllAccounts()
    {
        return await _context.Accounts.ToListAsync();
    }


    public async Task<Account> GetAccountById(int id)
    {
        var account = await _context.Accounts
            .FirstOrDefaultAsync(m => m.Id == id);

        return account!;
    }



    public async Task CreateAccount(Account account)
    {
        _context.Add(account);
        await _context.SaveChangesAsync();
 
    }

    public async Task<bool> AccountNumberExists(string accountNumber)
    {

        return await _context.Accounts.AnyAsync(a => a.AccountNumber == accountNumber);
    }



    public async Task UpdateAccount(Account account)
    {
        _context.Update(account);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAccount(int id)
    {
        var account = await _context.Accounts.FindAsync(id);
        if (account != null)
        {
            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> Deposit(Transaction transaction)
    {
        var account = await _context.Accounts.FindAsync(transaction.Id);

        if (account == null)
        {
            return false;
        }

        if (transaction.ValueAmount <= 0)
        {
            return false;
        }

        decimal MAX_OVERDRAFT = 1000000;


        if (transaction.AccountType == 'A')
        {
            transaction.BalanceAmount += transaction.ValueAmount;
        }
        else
        {
            transaction.BalanceAmount += transaction.ValueAmount;

           
            if (transaction.OverdraftAmount > 0 && transaction.BalanceAmount <= MAX_OVERDRAFT)
            {
                transaction.OverdraftAmount = MAX_OVERDRAFT - transaction.BalanceAmount;
            }
            else
            {
                transaction.OverdraftAmount = 0;
            }

        }

        MapAccountFromTransaction(account, transaction);

        await _context.SaveChangesAsync();

        return true;
    }

    private void MapAccountFromTransaction(Account account, Transaction transaction)
    {
        account.AccountType = transaction.AccountType;
        account.CreationDate = transaction.CreationDate;
        account.AccountNumber = transaction.AccountNumber;
        account.OwnerName = transaction.OwnerName;
        account.BalanceAmount = transaction.BalanceAmount;
        account.OverdraftAmount = transaction.OverdraftAmount;

    }



    public async Task<bool> Withdrawal(Transaction transaction, Account account)
    {
        decimal MAX_OVERDRAFT = 1000000;

        if (transaction.AccountType == 'A')
        {
            if (transaction.ValueAmount <= account.BalanceAmount)
            {
                account.BalanceAmount -= transaction.ValueAmount;
            }
            else
            {
                return false;
            }
        }
        else
        {
            if (transaction.ValueAmount <= account.BalanceAmount)
            {
                account.BalanceAmount -= transaction.ValueAmount;

                if (account.OverdraftAmount > 0 && account.BalanceAmount <= MAX_OVERDRAFT)
                {
                    account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
                }
            }
            else
            {
                return false;
            }
        }

        await _context.SaveChangesAsync();
        return true;
    }

}
