using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services
{
    public class AccountService : IAccountService
    {
        private readonly MoneybankdbContext _context;

        public AccountService(MoneybankdbContext context)
        {
            _context = context;
        }

        public Account Create(Account account)
        {
            if (account == null)
            {
                throw new ArgumentNullException(nameof(account));
            }

            account.Id = GetNextSequenceId();
            _context.Accounts.Add(account);
            _context.SaveChanges();
            return account;
        }

        public void DeleteById(int id)
        {
            var account = _context.Accounts.Find(id);
            if (account == null)
            {
                throw new ArgumentException("Account not found.", nameof(id));
            }

            _context.Accounts.Remove(account);
            _context.SaveChanges();
        }

        public List<Account> GetAll()
        {
            return _context.Accounts.ToList();
        }

        public Account GetById(int id)
        {
            return _context.Accounts.Find(id);
        }

        public Account Update(int id, Account updatedAccount)
        {
            var account = _context.Accounts.Find(id);
            if (account == null)
            {
                throw new ArgumentException("Account not found.", nameof(id));
            }

            account.AccountType = updatedAccount.AccountType;
            account.CreationDate = updatedAccount.CreationDate;
            account.AccountNumber = updatedAccount.AccountNumber;
            account.OwnerName = updatedAccount.OwnerName;
            account.BalanceAmount = updatedAccount.BalanceAmount;
            account.OverdraftAmount = updatedAccount.OverdraftAmount;

            _context.SaveChanges();
            return account;
        }

        private int GetNextSequenceId()
        {
            var nextSequenceId = _context.Accounts.Max(x => x.Id) + 1;
            return nextSequenceId;
        }


        public bool Retiro(int accountId, decimal amount)
        {
            var account = _context.Accounts.FirstOrDefault(a => a.Id == accountId);

            if (account == null)
            {
                return false; // Cuenta no encontrada
            }

            if (amount <= 0)
            {
                throw new ArgumentException("El valor del retiro debe ser mayor a cero.");
            }

            if (account.AccountType == "A")
            {
                if (account.BalanceAmount >= amount)
                {
                    account.BalanceAmount -= amount;
                }
                else
                {
                    throw new InvalidOperationException("Fondos insuficientes para realizar el retiro.");
                }
            }
            else if (account.AccountType == "C")
            {
                if (account.BalanceAmount + account.OverdraftAmount >= amount)
                {
                    if (account.BalanceAmount >= amount)
                    {
                        account.BalanceAmount -= amount;
                    }
                    else
                    {
                        var remainingAmount = amount - account.BalanceAmount;
                        account.BalanceAmount = 0;
                        account.OverdraftAmount -= remainingAmount;
                    }
                }
                else
                {
                    throw new InvalidOperationException("Fondos insuficientes para realizar el retiro.");
                }
            }

            _context.SaveChanges();
            return true;
        }

        public void Deposito(string accountType, decimal amount)
        {
            throw new NotImplementedException();
        }

        public void Retiro(string accountType, decimal amount)
        {
            throw new NotImplementedException();
        }
    }

    
}
