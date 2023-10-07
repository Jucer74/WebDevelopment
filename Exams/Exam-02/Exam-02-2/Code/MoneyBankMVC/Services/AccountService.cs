namespace MoneyBankMVC.Services;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Context;
using MoneyBankMVC.Models;

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
        var account = await _context.Accounts.FirstOrDefaultAsync(a => a.Id == id);
        if (account == null)
        {
            throw new InvalidOperationException("La cuenta no fue encontrada.");
        }
        return account;
    }



    public async Task<bool> CreateAccountAsync(Account account)
    {
        try
        {
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception)
        {
            // Manejo de errores
            return false;
        }
    }

    public async Task<bool> UpdateAccountAsync(Account account)
    {
        try
        {
            _context.Update(account);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception)
        {
            // Manejo de errores
            return false;
        }
    }

    public async Task<bool> DeleteAccountAsync(int id)
    {
        try
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account != null)
            {
                _context.Accounts.Remove(account);
                await _context.SaveChangesAsync();
            }
            return true;
        }
        catch (Exception)
        {
            // Manejo de errores
            return false;
        }
    }

    public async Task<bool> DepositAsync(Transaction transaction)
    {
        try
        {
            // Lógica para depositar dinero en la cuenta
            // Actualiza el saldo de la cuenta y guarda en la base de datos

            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception)
        {
            // Manejo de errores
            return false;
        }
    }

    public async Task<bool> WithdrawAsync(Transaction transaction)
    {
        try
        {
            // Lógica para realizar un retiro de la cuenta

            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception)
        {
            // Manejo de errores
            return false;
        }
    }
}

