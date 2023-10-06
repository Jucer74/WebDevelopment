using Microsoft.CodeAnalysis.Differencing;
using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public interface IAccountService
{
    List<Account> Listar();
    void Crear(Account account);
    void Editar(int id, Account account);
    void Depositar(int id, Account account);

    void Retirar(int id, Account account);
    Account Informacion(int id);
    void Eliminar(int id, Account account);
}