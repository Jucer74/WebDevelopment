using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Context;
using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public class AccountService : IAccountService
{
    private const decimal MAX_OVERDRAFT = 1_000_000;
    private readonly AppDbContext _context;

    public AccountService(AppDbContext context)
    {
        _context = context;
    }

    public async Task CreateAccountAsync(Account account)
    {
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
        if (account.AccountType == 'A')
        {
            account.BalanceAmount += transaction.ValueAmount;
        }
        else
        {

            // Lógica Cuenta Corriente
            if (account.OverdraftAmount > 0 && account.BalanceAmount < MAX_OVERDRAFT)
            {
                account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
            }
            else
            {
                account.OverdraftAmount = 0;
            }
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
