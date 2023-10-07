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

    public bool Create(Account account)
    {
        throw new NotImplementedException();
    }

    public void Delete(int id, Account account)
    {
        throw new NotImplementedException();
    }

    public void Deposit(int id, Account account, decimal depositAmount)
    {
        throw new NotImplementedException();
    }

    public void Edit(int id, Account account)
    {
        throw new NotImplementedException();
    }

    public List<Account> GetAll()
    {
        return _context.Set<Account>().ToList<Account>();
    }

    public Account GetById(int id)
    {
        throw new NotImplementedException();
    }

    public bool Withdrawal(int id, Account account, decimal withdrawal)
    {
        throw new NotImplementedException();
    }
}
