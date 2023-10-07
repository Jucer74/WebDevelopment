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

    public async Task<Account> CreateAccountAsync(Account account)
    {
        _context.Add(account);
        await _context.SaveChangesAsync();
        return account;
    }

    public async Task<List<Account>> GetAccountsAsync()
    {
        return await _context.Accounts.ToListAsync();
    }
}
