using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Context;
using MoneyBankMVC.Models;

namespace MoneyBankMVC.Controllers
{
    public class AccountsController : Controller
    {
        private readonly MoneybankdbContext _context;

        // Constructor: Inicializa el contexto de la base de datos
        public AccountsController(MoneybankdbContext context)
        {
            _context = context;
        }

        // Mostrar la lista de cuentas
        public async Task<IActionResult> Index()
        {
            return View(await _context.Accounts.ToListAsync());
        }

        // Mostrar detalles de una cuenta
        public async Task<IActionResult> Details(int? id)
        {
            return await DisplayAccountForModification(id);
        }

        // Vista para crear una nueva cuenta
        public IActionResult Create()
        {
            return View();
        }

        // Crear una cuenta (acción POST)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,AccountType,AccountNumber,OwnerName,BalanceAmount,OverdraftAmount")] Account account)
        {
            if (account.AccountType == "A" && account.BalanceAmount <= 0)
            {
                ModelState.AddModelError("BalanceAmount", "Para cuentas de ahorros, el balance debe ser mayor a cero.");
            }

            if (account.AccountType == "C")
            {
                account.BalanceAmount += Account.MAX_OVERDRAFT;
            }

            if (ModelState.IsValid)
            {
                account.CreationDate = DateTime.Now;
                _context.Add(account);
                await _context.SaveChangesAsync();
                TempData["SuccessMessage"] = "La creacion fue exitosa.";
                return RedirectToAction(nameof(Index));
            }
            return View(account);
        }

        // Vista para editar una cuenta
        public async Task<IActionResult> Edit(int? id)
        {
            return await DisplayAccountForModification(id);
        }

        // Editar una cuenta (acción POST)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,AccountType,CreationDate,AccountNumber,OwnerName,BalanceAmount,OverdraftAmount")] Account account)
        {
            if (id != account.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(account);
                    await _context.SaveChangesAsync();
                    TempData["SuccessMessage"] = "La edicion fue exitosa.";
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AccountExists(account.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(account);
        }

        // Vista para eliminar una cuenta
        public async Task<IActionResult> Delete(int? id)
        {
            return await DisplayAccountForModification(id);
        }

        // Eliminar una cuenta (acción POST)
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();
            TempData["SuccessMessage"] = "La eliminación fue exitosa.";
            return RedirectToAction(nameof(Index));
        }

        // Vista para depositar en una cuenta
        public async Task<IActionResult> Depositar(int? id)
        {
            var account = await GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return View("Depositar", account);
        }

        // Depositar dinero en una cuenta (acción POST)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Depositar(int id, decimal amount)
        {
            var account = await GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            // Lógica para el depósito según el tipo de cuenta
            if (account.AccountType == "A")
            {
                account.BalanceAmount += amount;
            }
            else if (account.AccountType == "C")
            {
                if (account.OverdraftAmount > 0)
                {
                    decimal amountNeededToCoverOverdraft = account.OverdraftAmount;

                    if (amount >= amountNeededToCoverOverdraft)
                    {
                        account.BalanceAmount += (amount - amountNeededToCoverOverdraft);
                        account.OverdraftAmount = 0;
                    }
                    else
                    {
                        account.OverdraftAmount -= amount;
                    }
                }
                else
                {
                    account.BalanceAmount += amount;
                }
            }

            await _context.SaveChangesAsync();
            TempData["SuccessMessage"] = "El deposito fue exitoso.";
            return RedirectToAction(nameof(Index));
        }

        // Vista para retirar de una cuenta
        public async Task<IActionResult> Retirar(int? id)
        {
            var account = await GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return View("Retirar", account);
        }

        // Retirar dinero de una cuenta (acción POST)
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Retirar(int id, decimal amount)
        {
            var account = await GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            // Lógica para el retiro según el tipo de cuenta
            if (account.AccountType == "A")
            {
                if (amount <= account.BalanceAmount)
                {
                    account.BalanceAmount -= amount;
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Fondos Insuficientes.");
                    return View("Retirar", account);
                }
            }
            else if (account.AccountType == "C")
            {
                decimal totalAvailable = account.BalanceAmount + Account.MAX_OVERDRAFT - account.OverdraftAmount;

                if (amount <= totalAvailable)
                {
                    if (amount <= account.BalanceAmount)
                    {
                        account.BalanceAmount -= amount;
                    }
                    else
                    {
                        decimal amountFromOverdraft = amount - account.BalanceAmount;
                        account.BalanceAmount = 0;
                        account.OverdraftAmount += amountFromOverdraft;
                    }
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Fondos Insuficientes.");
                    return View("Retirar", account);
                }
            }

            await _context.SaveChangesAsync();
            TempData["SuccessMessage"] = "El retiro fue exitoso.";
            return RedirectToAction(nameof(Index));
        }

        private async Task<IActionResult> DisplayAccountForModification(int? id)
        {
            var account = await GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return View(account);
        }

        // Método privado para obtener una cuenta por su ID
        private async Task<Account?> GetAccountByIdAsync(int? id)
        {
            if (!id.HasValue) return null;
            return await _context.Accounts.FirstOrDefaultAsync(m => m.Id == id.Value);
        }

        // Método privado que verifica si una cuenta existe
        private bool AccountExists(int id)
        {
            return _context.Accounts.Any(e => e.Id == id);
        }
    }
}
