using Microsoft.AspNetCore.Mvc;
using MoneyBankMVC.Models;
using MoneyBankMVC.Services;

namespace MoneyBankMVC.Controllers
{
    public class AccountsController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountsController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        public async Task<IActionResult> Index()
        {
            var accounts = await _accountService.GetAccountsAsync();
            return View(accounts);
        }

        public async Task<IActionResult> Details(int? id)
        {
            if (!id.HasValue)
            {
                return NotFound();
            }

            var account = await _accountService.GetAccountByIdAsync(id.Value);

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
        public async Task<IActionResult> Create(Account account)
        {
            if (ModelState.IsValid)
            {
                var success = await _accountService.CreateAccountAsync(account);

                if (success)
                {
                    TempData["SuccessMessage"] = "La creación de la cuenta fue exitosa.";
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    ModelState.AddModelError("AccountNumber", "El número de cuenta ya existe.");
                }
            }

            return View(account);
        }

        public async Task<IActionResult> Edit(int? id)
        {
            if (!id.HasValue)
            {
                return NotFound();
            }

            var account = await _accountService.GetAccountByIdAsync(id.Value);

            if (account == null)
            {
                return NotFound();
            }

            return View(account);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Account account)
        {
            if (id != account.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                var success = await _accountService.UpdateAccountAsync(account);

                if (success)
                {
                    TempData["SuccessMessage"] = "La edición de la cuenta fue exitosa.";
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    ModelState.AddModelError("", "Error al intentar actualizar la cuenta.");
                }
            }

            return View(account);
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (!id.HasValue)
            {
                return NotFound();
            }

            var account = await _accountService.GetAccountByIdAsync(id.Value);

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
            var success = await _accountService.DeleteAccountAsync(id);

            if (success)
            {
                TempData["SuccessMessage"] = "La eliminación de la cuenta fue exitosa.";
            }
            else
            {
                TempData["ErrorMessage"] = "Error al intentar eliminar la cuenta.";
            }

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Deposit(int? id)
        {
            if (!id.HasValue)
            {
                return NotFound();
            }

            var account = await _accountService.GetAccountByIdAsync(id.Value);

            if (account == null)
            {
                return NotFound();
            }

            return View(account);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Deposit(int id, decimal amount)
        {
            if (amount <= 0)
            {
                ModelState.AddModelError("amount", "El monto del depósito debe ser mayor a cero.");
                return View("Deposit", await _accountService.GetAccountByIdAsync(id));
            }

            var success = await _accountService.DepositAsync(id, amount);

            if (success)
            {
                TempData["SuccessMessage"] = "El depósito fue exitoso.";
            }
            else
            {
                TempData["ErrorMessage"] = "Error al intentar realizar el depósito.";
            }

            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Withdrawal(int? id)
        {
            if (!id.HasValue)
            {
                return NotFound();
            }

            var account = await _accountService.GetAccountByIdAsync(id.Value);

            if (account == null)
            {
                return NotFound();
            }

            return View(account);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Withdrawal(int id, decimal amount)
        {
            if (amount <= 0)
            {
                ModelState.AddModelError("amount", "El monto del retiro debe ser mayor a cero.");
                return View("Withdrawal", await _accountService.GetAccountByIdAsync(id));
            }

            var success = await _accountService.WithdrawalAsync(id, amount);

            if (success)
            {
                TempData["SuccessMessage"] = "El retiro fue exitoso.";
            }
            else
            {
                TempData["ErrorMessage"] = "Error al intentar realizar el retiro.";
            }

            return RedirectToAction(nameof(Index));
        }
    }
}