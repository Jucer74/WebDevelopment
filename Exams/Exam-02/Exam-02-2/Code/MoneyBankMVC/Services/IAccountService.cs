using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    List<Account> Listar();

    void Crear(Account account);

    void Editar(int id, Account account);

    void Depositar(int id, Account account, decimal depositAmount);

    bool Retirar(int id, Account account, decimal withdrawal);

    Account Informacion(int id);

    void Eliminar(int id, Account account);

    bool AccountExists(string accountNumber);
}