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

    public async Task<List<Account>> GetAccountsAsync()
    {
        return await _context.Accounts.ToListAsync();
    }

    public async Task<Account> GetAccountByIdAsync(int id)
    {
#pragma warning disable CS8603 // Posible tipo de valor devuelto de referencia nulo
        return await _context.Accounts.FirstOrDefaultAsync(m => m.Id == id);
#pragma warning restore CS8603 // Posible tipo de valor devuelto de referencia nulo
    }

    public async Task<bool> CreateAccountAsync(Account account)
    {
        // Verificar si el número de cuenta ya existe en la base de datos
        bool isAccountNumberUnique = !_context.Accounts.Any(a => a.AccountNumber == account.AccountNumber);

        if (!isAccountNumberUnique)
        {
            return false; // El número de cuenta ya existe
        }

        InitializeAccount(account);

        _context.Add(account);
        await _context.SaveChangesAsync();
        return true; // Creación exitosa
    }

    public async Task<bool> UpdateAccountAsync(Account account)
    {
        try
        {
            _context.Update(account);
            await _context.SaveChangesAsync();
            return true; // Edición exitosa
        }
        catch (DbUpdateConcurrencyException)
        {
            return false; // Error de concurrencia
        }
    }

    public async Task<bool> DeleteAccountAsync(int id)
    {
        var account = await _context.Accounts.FindAsync(id);
        if (account == null)
        {
            return false; // No se encontró la cuenta
        }

        _context.Accounts.Remove(account);
        await _context.SaveChangesAsync();
        return true; // Eliminación exitosa
    }

    public async Task<bool> DepositAsync(int id, decimal amount)
    {
        var account = await GetAccountByIdAsync(id);
        if (account == null)
        {
            return false; // No se encontró la cuenta
        }

        PerformDeposit(account, amount);
        await _context.SaveChangesAsync();
        return true; // Depósito exitoso
    }

    public async Task<bool> WithdrawalAsync(int id, decimal amount)
    {
        var account = await GetAccountByIdAsync(id);
        if (account == null)
        {
            return false; // No se encontró la cuenta
        }

        if (amount <= 0 || amount > account.BalanceAmount)
        {
            return false; // Monto de retiro no válido
        }

        PerformWithdrawal(account, amount);
        await _context.SaveChangesAsync();
        return true; // Retiro exitoso
    }

    private void InitializeAccount(Account account)
    {
        account.CreationDate = DateTime.Now;

        if (account.AccountType == 'C')
        {
            account.BalanceAmount += Account.MAX_OVERDRAFT;
        }
    }

    private void PerformDeposit(Account account, decimal amount)
    {
        account.BalanceAmount += amount;

        if (account.AccountType == 'C')
        {
            if (account.OverdraftAmount > 0 && account.BalanceAmount < Account.MAX_OVERDRAFT)
            {
                account.OverdraftAmount = Account.MAX_OVERDRAFT - account.BalanceAmount;
            }
            else
            {
                account.OverdraftAmount = 0;
            }
        }
    }

    private void PerformWithdrawal(Account account, decimal amount)
    {
        account.BalanceAmount -= amount;

        if (account.AccountType == 'C' && account.OverdraftAmount > 0 && account.BalanceAmount < Account.MAX_OVERDRAFT)
        {
            account.OverdraftAmount = Account.MAX_OVERDRAFT - account.BalanceAmount;
        }
    }
}