using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public class AccountService : IAccountService
{
    private const int MAX_OVERDRAFT = 1000000;
    private readonly MoneybankdbContext _context;

    public AccountService(MoneybankdbContext context)
    {
        _context = context;
    }

    public List<Account> Listar()
    {
        return _context.Set<Account>().ToList<Account>();
    }

    public bool Crear(Account account)
    {
        
        if (account.BalanceAmount > 0)
        {
            account.Id = GenerateId();
            account.CreationDate = DateTime.Now;
            if (account.AccountType == 'C')
            {
                account.BalanceAmount += MAX_OVERDRAFT;

                if (account.BalanceAmount < MAX_OVERDRAFT)
                {
                    account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
                }
            }
            _context.Add(account);
            _context.SaveChanges();
            return true;
        }
        return false;
    }

    public void Depositar(int id, Account account, decimal depositAmount)
    {
        account.BalanceAmount += depositAmount;

        if (account.AccountType == 'C')
        {
            if (account.OverdraftAmount > 0 && account.BalanceAmount < MAX_OVERDRAFT)
            {
                account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
            }
            else
            {
                account.OverdraftAmount = 0;
            }
        }

        Editar(id, account);
    }

    public bool Retirar(int id, Account account, decimal withdrawal)
    {
        if (withdrawal <= account.BalanceAmount)
        {
            account.BalanceAmount -= withdrawal;

            if (account.AccountType == 'C')
            {
                if (account.OverdraftAmount >= 0 && account.BalanceAmount < MAX_OVERDRAFT)
                {
                    account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
                }
                Editar(id, account);
                return (true);
            }
            Editar(id, account);
            return (true);
        }
        else
        {
            Editar(id, account);
            return (false);
        }
    }

    public void Editar(int id, Account account)
    {
        _context.Update(account);
        _context.SaveChanges();
    }

    public void Eliminar(int id, Account account)
    {
        var accountToDelete = Informacion(id);

        if (accountToDelete != null)
        {
            _context.Remove(accountToDelete);
            _context.SaveChanges();
        }
    }

    public Account Informacion(int id)
    {
        var account = _context.Accounts.FirstOrDefault<Account>(account => account.Id == id);
        return account!;
    }

    private int GenerateId()
    {
        var Id = _context.Accounts.Max(e => e.Id) + 1;
        return Id;
    }

    public bool AccountExists(string accountNumber)
    {
        return (_context.Accounts?.Any(e => e.AccountNumber == accountNumber)).GetValueOrDefault();
    }


    public Transaction MapTransaction(Account accountToDeposit)
    {
        return new Transaction
        {
            Id = accountToDeposit.Id,
            AccountType = accountToDeposit.AccountType,
            AccountNumber = accountToDeposit.AccountNumber,
            BalanceAmount = accountToDeposit.BalanceAmount,
            OverdraftAmount = accountToDeposit.OverdraftAmount,
            CreationDate = accountToDeposit.CreationDate,
            OwnerName = accountToDeposit.OwnerName,
            TransactionAmount = 0.0M
        };
    }

    public Transaction MapAccount(Transaction transaction)
    {
        return new Transaction
        {
            Id = transaction.Id,
            AccountType = transaction.AccountType,
            AccountNumber = transaction.AccountNumber,
            BalanceAmount = transaction.BalanceAmount,
            OverdraftAmount = transaction.OverdraftAmount,
            CreationDate = transaction.CreationDate,
            OwnerName = transaction.OwnerName,
        };
    }

}