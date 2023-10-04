using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Context;
using MoneyBankMVC.Models;
using MoneyBankMVC.Services;

namespace MoneyBankMVC.Controllers
{
    public class AccountsController : Controller
    {
        private readonly MoneybankdbContext _context;
        private readonly IAccountService ServicioLogicaNegocio;

        public AccountsController(MoneybankdbContext context, IAccountService accountService)
        {
            _context = context;
            ServicioLogicaNegocio = accountService;
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,AccountType,AccountNumber,OwnerName,BalanceAmount,OverdraftAmount")] Account account)
        {
            try
            {
                await ServicioLogicaNegocio.CrearCuenta(account);
                return RedirectToAction(nameof(Index));
            }
            catch (InvalidOperationException ex)
            {
                ModelState.AddModelError("BalanceAmount", ex.Message);
                return View(account);
            }
        }

        public async Task<IActionResult> Edit(int? id)
        {
            var account = await ServicioLogicaNegocio.GetAccountByIdAsync(id);
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
                    // Llama al método del servicio para editar la cuenta
                    await ServicioLogicaNegocio.EditarCuenta(id, account);
                }
                catch (InvalidOperationException ex)
                {
                    return NotFound(ex.Message);
                }
                return RedirectToAction(nameof(Index));
            }
            return View(account);
        }

        public async Task<IActionResult> Delete(int? id)
        {
            var account = await ServicioLogicaNegocio.GetAccountByIdAsync(id);
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
            await ServicioLogicaNegocio.EliminarCuenta(id);
            return RedirectToAction(nameof(Index));
        }

        public async Task<IActionResult> Depositar(int? id)
        {
            var account = await ServicioLogicaNegocio.GetAccountByIdAsync(id);
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
            try
            {
                await ServicioLogicaNegocio.Depositar(id, amount); // Llama al método del servicio
                return RedirectToAction(nameof(Index));
            }
            catch (InvalidOperationException ex)
            {
                // Maneja la excepción si la cuenta no se encuentra
                return NotFound(ex.Message);
            }
        }

        public async Task<IActionResult> Retirar(int? id)
        {
            var account = await ServicioLogicaNegocio.GetAccountByIdAsync(id);
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
            try
            {
                await ServicioLogicaNegocio.Retirar(id, amount);
                return RedirectToAction(nameof(Index));
            }
            catch (InvalidOperationException ex)
            {
                ModelState.AddModelError(string.Empty, ex.Message);
                var account = await ServicioLogicaNegocio.GetAccountByIdAsync(id);
                if (account == null)
                {
                    return NotFound();
                }
                return View("Retirar", account);
            }
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.Accounts.ToListAsync());
        }

        public async Task<IActionResult> Details(int? id)
        {
            var account = await ServicioLogicaNegocio.GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return View(account);
        }
    }
}
