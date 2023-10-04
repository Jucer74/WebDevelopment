using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Models;

namespace MoneyBankMVC.Services;

public class AccountService : IAccountService
{
    private readonly ApplicationDbContext _context;
    private const decimal MAX_OVERDRAFT = 1000000.00m; // Valor máximo de sobregiro



    public AccountService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task CrearCuenta(Account cuenta)
    {
        // Validaciones de cuenta
        if (cuenta.AccountType == "C")
        {
            cuenta.BalanceAmount += MAX_OVERDRAFT; // Añadir sobregiro a cuentas corrientes
        }
        else if (cuenta.AccountType != "A")
        {
            throw new InvalidOperationException("Tipo de cuenta no válido.");
        }

        if (cuenta.BalanceAmount < 0)
        {
            throw new InvalidOperationException("El saldo inicial no puede ser negativo.");
        }

        if (cuenta.BalanceAmount > MAX_OVERDRAFT)
        {
            throw new InvalidOperationException("El saldo inicial no puede exceder el máximo de sobregiro.");
        }

        _context.Accounts.Add(cuenta);
        await _context.SaveChangesAsync();
    }

    public async Task Depositar(int id, decimal monto)
    {
        var account = await _context.Accounts.FindAsync(id);

        if (account == null)
        {
            throw new InvalidOperationException("Cuenta no encontrada.");
        }

        account.BalanceAmount += monto;

        if (account.AccountType == "C" && account.BalanceAmount < 0)
        {
            // Actualizar el sobregiro en cuentas corrientes
            account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
        }

        await _context.SaveChangesAsync();
    }


    public async Task EditarCuenta(int id, Account cuenta)
    {
        var existingAccount = await _context.Accounts.FindAsync(id);

        if (existingAccount == null)
        {
            throw new InvalidOperationException("Cuenta no encontrada.");
        }

        existingAccount.AccountType = cuenta.AccountType;
        existingAccount.CreationDate = cuenta.CreationDate;
        existingAccount.AccountNumber = cuenta.AccountNumber;
        existingAccount.OwnerName = cuenta.OwnerName;

        _context.Entry(existingAccount).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task EliminarCuenta(int id)
    {
        var account = await _context.Accounts.FindAsync(id);

        if (account == null)
        {
            throw new InvalidOperationException("Cuenta no encontrada.");
        }

        _context.Accounts.Remove(account);
        await _context.SaveChangesAsync();
    }

    public async Task<List<Account>> ListarCuentas()
    {
        return await _context.Accounts.ToListAsync();
    }

    public async Task<Account> ObtenerInformacion(int id)
    {
        var account = await _context.Accounts.FindAsync(id);

        if (account == null)
        {
            throw new InvalidOperationException("Cuenta no encontrada.");
        }

        return account;
    }

    public async Task Retirar(int id, decimal monto)
    {
        var account = await _context.Accounts.FindAsync(id);

        if (account == null)
        {
            throw new InvalidOperationException("Cuenta no encontrada.");
        }

        if (monto <= 0)
        {
            throw new InvalidOperationException("El monto de retiro debe ser mayor que cero.");
        }

        if (monto > account.BalanceAmount)
        {
            throw new InvalidOperationException("Fondos insuficientes para el retiro.");
        }

        account.BalanceAmount -= monto;

        if (account.AccountType == "C" && account.BalanceAmount < 0)
        {
            // Actualizar el sobregiro en cuentas corrientes
            account.OverdraftAmount = MAX_OVERDRAFT - account.BalanceAmount;
        }

        await _context.SaveChangesAsync();
    }
}
