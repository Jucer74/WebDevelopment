using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public class AccountService : IAccountService
{
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

    public void Depositar(int id, Account account)
    {
        throw new NotImplementedException();
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
