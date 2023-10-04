using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public class AccountService : IAccountService
{
    private readonly MoneyBankContext _context;

    public AccountService(MoneyBankContext context)
    {
        _context = context;
    }

    public async Task<Account?> GetAccountByIdAsync(int id)
    {
        var account = await _context.Accounts.FirstOrDefaultAsync(a => a.Id == id);
        return account;
    }


    public async Task<IEnumerable<Account>> GetAllAccountsAsync()
    {
        return await _context.Accounts.ToListAsync();
    }

    public async Task CreateAccountAsync(Account account)
    {
        _context.Add(account);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAccountAsync(Account account)
    {
        _context.Update(account);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAccountAsync(int id)
    {
        var account = await GetAccountByIdAsync(id);
        if (account != null)
        {
            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();
        }
    }

    public async Task DepositAsync(int id, decimal amount)
    {
        var account = await GetAccountByIdAsync(id);
        if (account == null)
        {
            throw new InvalidOperationException("Cuenta no encontrada.");
        }

        if (amount <= 0)
        {
            throw new ArgumentException("El valor del depósito debe ser mayor que cero.");
        }

        if (account.AccountType == 'A')
        {
            account.BalanceAmount += amount;
        }
        else
        {
            account.BalanceAmount += amount;
            if (account.BalanceAmount < 0)
            {
                account.OverdraftAmount += Math.Abs(account.BalanceAmount);
                account.BalanceAmount = 0;
            }
        }

        await _context.SaveChangesAsync();
    }

    public async Task WithdrawAsync(int id, decimal amount)
    {
        var account = await GetAccountByIdAsync(id);
        if (account == null)
        {
            throw new InvalidOperationException("Cuenta no encontrada.");
        }

        if (amount <= 0)
        {
            throw new ArgumentException("El valor de retiro debe ser mayor que cero.");
        }

        if (account.AccountType == 'A')
        {
            if (amount <= account.BalanceAmount)
            {
                account.BalanceAmount -= amount;
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("Fondos insuficientes.");
            }
        }
        else
        {
            if (amount <= (account.BalanceAmount + account.OverdraftAmount))
            {
                if (amount <= account.BalanceAmount)
                {
                    account.BalanceAmount -= amount;
                }
                else
                {
                    account.OverdraftAmount -= (amount - account.BalanceAmount);
                    account.BalanceAmount = 0;
                }

                await _context.SaveChangesAsync();
            }
            else
            {
                throw new InvalidOperationException("Fondos insuficientes.");
            }
        }
    }

    public async Task<bool> AccountExistsAsync(int id)
    {
        return await _context.Accounts.AnyAsync(a => a.Id == id);
    }


}