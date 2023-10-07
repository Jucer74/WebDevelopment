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

    public async Task<List<Account>> GetAccountsAsync()
    {
        return await _context.Accounts.ToListAsync();
    }

    public async Task<Account> GetAccountByIdAsync(int id)
    {
        return await _context.Accounts.FindAsync(id);
    }

    public async Task CreateAccountAsync(Account account)
    {
        _context.Add(account);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAccountAsync(Account account)
    {
        _context.Update(account);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAccountAsync(int id)
    {
        var account = await _context.Accounts.FindAsync(id);
        if (account != null)
        {
            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();
        }
    }
    public async Task<Transaction> GetTransactionForDepositAsync(int accountId)
    {
        var account = await _context.Accounts.FindAsync(accountId);
        if (account == null)
        {
            return null;
        }

        var transaction = MapTransaction(account);
        return transaction;
    }

    public async Task DepositFundsAsync(Transaction transaction)
    {
        try
        {
            var account = MapAccount(transaction);

            _context.Update(account);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AccountExists(transaction.Id))
            {
                throw new Exception("La cuenta no existe."); // Manejar la excepción según tus necesidades.
            }
            else
            {
                throw;
            }
        }
    }






    public async Task WithdrawalFundsAsync(Transaction transaction)
    {
        try
        {
            var account = MapAccountWithdrawal(transaction);

            _context.Update(account);
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AccountExists(transaction.Id))
            {
                throw new Exception("La cuenta no existe."); // Manejar la excepción según tus necesidades.
            }
            else
            {
                throw;
            }
        }
    }








    public bool AccountExists(int id)
    {
        return _context.Accounts.Any(e => e.Id == id);
    }

    private Account MapAccount(Transaction transaction)
    {
        Account account = new Account();

        account.Id = transaction.Id;
        account.AccountType = transaction.AccountType;
        account.CreationDate = transaction.CreationDate;
        account.AccountNumber = transaction.AccountNumber;
        account.OwnerName = transaction.OwnerName;
        account.BalanceAmount = transaction.BalanceAmount;
        account.OverdraftAmount = transaction.OverdraftAmount;

        if(account.AccountType == 'A')
        {
            account.BalanceAmount += transaction.ValueAmount;
        }

        else
        {
            account.BalanceAmount += transaction.ValueAmount;


            decimal MAX_OVERDRAFT = 1000000;
            if (account.OverdraftAmount > 0 && account.BalanceAmount < MAX_OVERDRAFT)
            {
                account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
            }
            else
            {
                account.OverdraftAmount = 0;
            }
        }
        // Otras propiedades de Account que puedas tener aquí.

        return account;
    }






    private Account MapAccountWithdrawal(Transaction transaction)
    {
        Account account = new Account();

        account.Id = transaction.Id;
        account.AccountType = transaction.AccountType;
        account.CreationDate = transaction.CreationDate;
        account.AccountNumber = transaction.AccountNumber;
        account.OwnerName = transaction.OwnerName;
        account.BalanceAmount = transaction.BalanceAmount;
        account.OverdraftAmount = transaction.OverdraftAmount;

        if (account.AccountType == 'A')
        {

            if (transaction.ValueAmount <= account.BalanceAmount)
            {
                account.BalanceAmount -= transaction.ValueAmount;
            }
           

        }
        else
        {
            decimal MAX_OVERDRAFT = 1000000;

            if (transaction.ValueAmount <= account.BalanceAmount)
            {
                account.BalanceAmount -= transaction.ValueAmount;

                if (account.OverdraftAmount > 0 && account.BalanceAmount < MAX_OVERDRAFT)
                {
                    account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
                }
            }
          
            

        }
        // Otras propiedades de Account que puedas tener aquí.

        return account;
    }




    private Transaction MapTransaction(Account account)
    {
        Transaction transaction = new Transaction();

        transaction.Id = account.Id;
        transaction.AccountType = account.AccountType;
        transaction.CreationDate = account.CreationDate;
        transaction.AccountNumber = account.AccountNumber;
        transaction.OwnerName = account.OwnerName;
        transaction.BalanceAmount = account.BalanceAmount;
        transaction.OverdraftAmount = account.OverdraftAmount;

        // Otras propiedades de Transaction que puedas tener aquí.

        return transaction;
    }

    public bool AccountNumberExists(string accountNumber)
    {
        return _context.Accounts.Any(account => account.AccountNumber == accountNumber);
    }


    public List<Account> GetAll()
    {
        throw new NotImplementedException();
    }
}
