using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    Task<List<Account>> ListarCuentas();
    Task CrearCuenta(Account cuenta);
    Task EditarCuenta(int id, Account cuenta);
    Task Depositar(int id, decimal monto);
    Task Retirar(int id, decimal monto);
    Task<Account> ObtenerInformacion(int id);
    Task EliminarCuenta(int id);
}