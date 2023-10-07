using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Context;
using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services
{
    public class AccountService : IAccountService
    {
        private readonly AppDbContext _context;

        public AccountService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Account>> GetAllAccountsAsync()
        {
            return await _context.Accounts.ToListAsync();
        }

        public async Task<Account> GetAccountByIdAsync(int id)
        {
            return await _context.Accounts.FindAsync(id);
        }

        public async Task<bool> CreateAccountAsync(Account account)
        {
            try
            {
                _context.Add(account);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                // Manejar cualquier error aquí
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
                // Manejar cualquier error aquí
                return false;
            }
        }

        public async Task<bool> DeleteAccountAsync(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account != null)
            {
                try
                {
                    _context.Accounts.Remove(account);
                    await _context.SaveChangesAsync();
                    return true;
                }
                catch (Exception)
                {
                    // Manejar cualquier error aquí
                }
            }
            return false;
        }

        public async Task<bool> DepositAsync(int id, decimal amount)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account != null && amount > 0)
            {
                try
                {
                    account.BalanceAmount += amount;
                    await _context.SaveChangesAsync();
                    return true;
                }
                catch (Exception)
                {
                    // Manejar cualquier error aquí
                }
            }
            return false;
        }

        public async Task<bool> WithdrawAsync(int id, decimal amount)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account != null && amount > 0 && amount <= account.BalanceAmount)
            {
                try
                {
                    account.BalanceAmount -= amount;
                    await _context.SaveChangesAsync();
                    return true;
                }
                catch (Exception)
                {
                    // Manejar cualquier error aquí
                }
            }
            return false;
        }

        public async Task<bool> IsAccountNumberAvailableAsync(string accountNumber)
        {
            return !await _context.Accounts.AnyAsync(a => a.AccountNumber == accountNumber);
        }
    }
}
