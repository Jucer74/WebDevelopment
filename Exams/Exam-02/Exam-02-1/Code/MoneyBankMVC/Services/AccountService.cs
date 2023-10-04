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

        public IEnumerable<Accounts> GetAllAccounts()
        {
            return _context.Set<Accounts>().ToList();
        }

        public Accounts GetAccountById(int id)
        {
            return _context.Set<Accounts>().Find(id);
        }

        public void CreateAccount(Accounts account)
        {
            _context.Set<Accounts>().Add(account);
            _context.SaveChanges();
        }

        public void UpdateAccount(Accounts account)
        {
            _context.Entry(account).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteAccount(int id)
        {
            var account = GetAccountById(id);
            if (account != null)
            {
                _context.Set<Accounts>().Remove(account);
                _context.SaveChanges();
            }
        }
    }
}
