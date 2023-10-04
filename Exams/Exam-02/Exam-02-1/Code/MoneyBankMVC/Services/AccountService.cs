using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Context;
using MoneyBankMVC.Models;
using System.Security.Principal;

namespace MoneyBankMVC.Services;

public class AccountService : IAccountService
{
    private readonly MoneybankdbContext _context;

    public AccountService(MoneybankdbContext context)
    {
        _context = context;
    }

    public async Task Create(Account account)
    {
        if (account.AccountType == "A" && account.BalanceAmount <= 0)
        {
            throw new InvalidOperationException("El balance tiene que ser mayor a 0 si es cuenta de ahorros");
        }

        if (account.AccountType == "C")
        {
            account.BalanceAmount += Account.MAX_OVERDRAFT;
        }

        account.CreationDate = DateTime.Now;

        _context.Add(account);
        await _context.SaveChangesAsync();
    }

    public async Task Deposit(int id, decimal amount)
    {
        var account = await GetAccountByIdAsync(id);
        if (account == null)
        {
            throw new InvalidOperationException("La cuenta no existe");
        }

        if (account.AccountType == "A")
        {
            account.BalanceAmount += amount;
        }
        else if (account.AccountType == "C")
        {
            account.BalanceAmount += amount;

            if (account.OverdraftAmount > 0 && account.BalanceAmount < Account.MAX_OVERDRAFT)
            {
                account.OverdraftAmount = Account.MAX_OVERDRAFT - account.BalanceAmount;
            }
        }

        await _context.SaveChangesAsync();
    }


    public async Task Edit(int id, Account account)
    {
        var existingAccount = await _context.Accounts.FindAsync(id);

        if (existingAccount == null)
        {
            throw new InvalidOperationException("La cuenta no existe");
        }

        existingAccount.AccountType = account.AccountType;
        existingAccount.AccountNumber = account.AccountNumber;
        existingAccount.OwnerName = account.OwnerName;
        existingAccount.BalanceAmount = account.BalanceAmount;
        existingAccount.OverdraftAmount = account.OverdraftAmount;

        await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var account = await _context.Accounts.FindAsync(id);
        if (account != null)
        {
            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();
        }
    }


    public async Task Withdraw(int id, decimal amount)
    {
        var account = await _context.Accounts.FirstOrDefaultAsync(m => m.Id == id);
        if (account == null)
        {
            throw new InvalidOperationException("La cuenta no existe");
        }

        if (account.AccountType == "A")
        {
            if (amount <= account.BalanceAmount)
            {
                account.BalanceAmount -= amount;
            }
            else
            {
                throw new InvalidOperationException("No tienes saldo");
            }
        }
        else if (account.AccountType == "C")
        {
            decimal totalAvailable = account.BalanceAmount + Account.MAX_OVERDRAFT - account.OverdraftAmount;

            if (amount <= totalAvailable)
            {
                if (amount <= account.BalanceAmount)
                {
                    account.BalanceAmount -= amount;
                }
                else
                {
                    decimal amountFromOverdraft = amount - account.BalanceAmount;
                    account.BalanceAmount = 0;
                    account.OverdraftAmount += amountFromOverdraft;
                }
            }
            else
            {
                throw new InvalidOperationException("No tienes saldo");
            }
        }

        await _context.SaveChangesAsync();
    }

    public async Task<Account?> GetAccountByIdAsync(int? id)
    {
        if (!id.HasValue) return null;
        return await _context.Accounts.FirstOrDefaultAsync(m => m.Id == id.Value);
    }

    public bool AccountExists(int id)
    {
        return _context.Accounts.Any(e => e.Id == id);
    }
}
