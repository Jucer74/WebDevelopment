using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    
    Task CrearCuenta(Account cuenta);
    Task EditarCuenta(int id, Account cuenta);
    Task Depositar(int id, decimal monto);
    Task Retirar(int id, decimal monto);
    
    Task EliminarCuenta(int id);
    public Task<Account?> GetAccountByIdAsync(int? id);

    public bool AccountExists(int id);
}