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

        public AccountsController(MoneybankdbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.Accounts.ToListAsync());
        }

        public async Task<IActionResult> Details(int? id)
        {
            var account = await GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return View(account);
        }

        public IActionResult Create()
        {
            return View();
        }

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
                return RedirectToAction(nameof(Index));
            }
            return View(account);
        }

        public async Task<IActionResult> Edit(int? id)
        {
            var account = await GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return View(account);
        }

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

        public async Task<IActionResult> Delete(int? id)
        {
            var account = await GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return View(account);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account != null)
            {
                _context.Accounts.Remove(account);
                await _context.SaveChangesAsync();
            }
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Depositar(int? id)
        {
            var account = await GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return View("Depositar", account);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Depositar(int id, decimal amount)
        {
            var account = await GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            if (account.AccountType == "A")
            {
                account.BalanceAmount += amount;
            }
            else if (account.AccountType == "C")
            {
                account.BalanceAmount += amount;

                if (account.OverdraftAmount > 0 && account.BalanceAmount < Account.MAX_OVERDRAFT)
                {
                    account.OverdraftAmount = Account.MAX_OVERDRAFT - account.BalanceAmount;
                }
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Retirar(int? id)
        {
            var account = await GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return View("Retirar", account);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Retirar(int id, decimal amount)
        {
            var account = await GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }

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
            return RedirectToAction(nameof(Index));
        }

        private async Task<Account?> GetAccountByIdAsync(int? id)
        {
            if (!id.HasValue) return null;
            return await _context.Accounts.FirstOrDefaultAsync(m => m.Id == id.Value);
        }

        private bool AccountExists(int id)
        {
            return _context.Accounts.Any(e => e.Id == id);
        }
    }
}
