using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Context;
using MoneyBankMVC.Models;
using MoneyBankMVC.Services;

public class AccountService : IAccountService
{
    private readonly MoneybankdbContext _context;

    public AccountService(MoneybankdbContext context)
    {
        _context = context;
    }

    public async Task EliminarCuenta(int id)
    {
        var account = await GetAccountByIdAsync(id);
        if (account != null)
        {
            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();
        }
    }

    public async Task Retirar(int id, decimal monto)
    {
        var account = await GetAccountByIdAsync(id);
        if (account != null && monto > 0 && monto <= account.BalanceAmount)
        {
            account.BalanceAmount -= monto;
            await _context.SaveChangesAsync();
        }
    }

    public async Task CrearCuenta(Account cuenta)
    {
        InitializeAccount(cuenta);
        _context.Add(cuenta);
        await _context.SaveChangesAsync();
    }

    public async Task Depositar(int id, decimal monto)
    {
        var account = await GetAccountByIdAsync(id);
        if (account != null && monto > 0)
        {
            account.BalanceAmount += monto;
            await _context.SaveChangesAsync();
        }
    }

    public async Task EditarCuenta(int id, Account cuenta)
    {
        if (id != cuenta.Id)
        {
            throw new ArgumentException("ID de cuenta no válido.");
        }

        _context.Update(cuenta);
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

    private void InitializeAccount(Account account)
    {
        account.CreationDate = DateTime.Now;

        if (account.AccountType == "C")
        {
            account.BalanceAmount += Account.MAX_OVERDRAFT;
        }
    }
}
