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

    public void Crear(Account account)
    {
        _context.Add(account);
        _context.SaveChanges();
    }

    public void Depositar(int id, Account account, int Deposit)
    {
        account.BalanceAmount += Deposit;

        if (account.OverdraftAmount > 0 && account.BalanceAmount < MAX_OVERDRAFT)
        {
            account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
        }
        else
        {
            account.OverdraftAmount = 0;
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

    public void Retirar(int id, Account account)
    {
        throw new NotImplementedException();
    }

    private bool AccountExists(int id)
    {
        return (_context.Accounts?.Any(e => e.Id == id)).GetValueOrDefault();
    }

}
