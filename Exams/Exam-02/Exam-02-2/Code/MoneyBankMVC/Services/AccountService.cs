using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Context;
using MoneyBankMVC.Models;
using System.Security.Principal;

namespace MoneyBankMVC.Services;

public class AccountService : IAccountService
{
    private const int MAX_OVERDRAFT = 1_000_000;

    private readonly AppDbContext _context;

    public AccountService(AppDbContext context)
    {
        _context = context;
    }

    public async Task CreateAccountAsync(Account account)
    {
        if (account.AccountType == 'C')
        {
             account.BalanceAmount += MAX_OVERDRAFT;

        }
        else
        {
            account.OverdraftAmount = 0;
        }
        _context.Add(account);
        await _context.SaveChangesAsync();
    }

    public async Task EditAccountAsync(int id, Account account)
    {
        _context.Update(account);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAccountAsync(Account account)
    {
        _context.Accounts.Remove(account);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Account>> GetAccountsAsync()
    {
        return await _context.Accounts.ToListAsync();
    }

    public async Task DepositAsync(Account account, Transaction transaction)
    {
        account.BalanceAmount += transaction.ValueAmount;

        if (account.AccountType == 'C' && account.OverdraftAmount > 0 && account.BalanceAmount < MAX_OVERDRAFT)
        {
            account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
        }
        else
        {
            account.OverdraftAmount = 0;
        }

        await EditAccountAsync(account.Id, account);
    }

    public async Task WithdrawalAsync(Account account, Transaction transaction)
    {
        if (transaction.ValueAmount <= account.BalanceAmount)
        {
            account.BalanceAmount -= transaction.ValueAmount;

            if(account.AccountType == 'C' && account.OverdraftAmount > 0 && account.BalanceAmount < MAX_OVERDRAFT)
            {
                
                account.OverdraftAmount = MAX_OVERDRAFT + account.BalanceAmount;
            }
        }
        else
        {
            
        }
        await EditAccountAsync(account.Id, account);
    }

    public bool AccountExists(int id)
    {
        return (_context.Accounts?.Any(e => e.Id == id)).GetValueOrDefault();
    }

    public async Task<Account> FindAccountAsync(int? id)
    {
        return (await _context.Accounts.FirstOrDefaultAsync(m => m.Id == id))!;
    }

}