using MoneyBankMVC.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace MoneyBankMVC.Services
{
    public class AccountService : IAccountService
    {
        private readonly DbContext _context;  // Asumiendo que tienes un DbContext llamado DbContext.

        public AccountService(DbContext context)
        {
            _context = context;
        }

        public IEnumerable<Account> GetAllAccounts()
        {
            return _context.Set<Account>().ToList();
        }

        public Account GetAccountById(int id)
        {
            return _context.Set<Account>().Find(id);
        }

        public void CreateAccount(Account account)
        {
            _context.Set<Account>().Add(account);
            _context.SaveChanges();
        }

        public void UpdateAccount(Account account)
        {
            _context.Entry(account).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteAccount(int id)
        {
            var account = GetAccountById(id);
            if (account != null)
            {
                _context.Set<Account>().Remove(account);
                _context.SaveChanges();
            }
        }
    }
}
