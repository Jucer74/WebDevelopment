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

    public async Task CrearCuenta(Account account)
    {
        if (account.AccountType == "A" && account.BalanceAmount <= 0)
        {
            throw new InvalidOperationException("Para cuentas de ahorros, el balance debe ser mayor a cero.");
        }

        if (account.AccountType == "C")
        {
            account.BalanceAmount += Account.MAX_OVERDRAFT;
        }

        account.CreationDate = DateTime.Now;

        _context.Add(account);
        await _context.SaveChangesAsync();
    }

    public async Task Depositar(int id, decimal amount)
    {
        var account = await GetAccountByIdAsync(id);
        if (account == null)
        {
            throw new InvalidOperationException("Cuenta no encontrada.");
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


    public async Task EditarCuenta(int id, Account cuenta)
    {
        var existingAccount = await _context.Accounts.FindAsync(id);

        if (existingAccount == null)
        {
            throw new InvalidOperationException("La cuenta no existe.");
        }

        existingAccount.AccountType = cuenta.AccountType;
        existingAccount.AccountNumber = cuenta.AccountNumber;
        existingAccount.OwnerName = cuenta.OwnerName;
        existingAccount.BalanceAmount = cuenta.BalanceAmount;
        existingAccount.OverdraftAmount = cuenta.OverdraftAmount;

        await _context.SaveChangesAsync();
    }

    public async Task EliminarCuenta(int id)
    {
        var account = await _context.Accounts.FindAsync(id);
        if (account != null)
        {
            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();
        }
    }

   

    public async Task Retirar(int id, decimal amount)
    {
        var account = await _context.Accounts.FirstOrDefaultAsync(m => m.Id == id);
        if (account == null)
        {
            throw new InvalidOperationException("Cuenta no encontrada.");
        }

        if (account.AccountType == "A")
        {
            if (amount <= account.BalanceAmount)
            {
                account.BalanceAmount -= amount;
            }
            else
            {
                throw new InvalidOperationException("Fondos Insuficientes.");
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
                throw new InvalidOperationException("Fondos Insuficientes.");
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
