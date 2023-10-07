using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Context;
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
            var accounts = await _accountService.GetAllAccountsAsync();
            return View(accounts);
        }

        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
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

        // GET: Accounts/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Accounts/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,AccountType,CreationDate,AccountNumber,OwnerName,BalanceAmount,OverdraftAmount")] Account account)
        {
            
            if (await _accountService.AccountExists(account.AccountNumber))
            {
                ModelState.AddModelError("AccountNumber", "El número de cuenta ya existe.");
            }

            
            if (account.AccountType == 'C')
            {
                
                account.BalanceAmount += 1000000;
            }

            if (account.BalanceAmount <= 0)
            {
                ModelState.AddModelError("BalanceAmount", "El saldo debe ser mayor que cero.");
            }

            if (ModelState.IsValid)
            {
                await _accountService.CreateAccountAsync(account);
                return RedirectToAction(nameof(Index));
            }
            return View(account);
        }



        // GET: Accounts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
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

        // POST: Accounts/Edit/5
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
                await _accountService.EditAccountAsync(account);
                return RedirectToAction(nameof(Index));
            }

            return View(account);
        }

        // GET: Accounts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
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

        // POST: Accounts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _accountService.DeleteAccountAsync(id);
            return RedirectToAction(nameof(Index));
        }

        // GET: Accounts/Deposit/5
        public async Task<IActionResult> Deposit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var transaction = await _accountService.GetTransactionByIdAsync(id.Value);

            if (transaction == null)
            {
                return NotFound();
            }

            return View(transaction);
        }

        // POST: Accounts/Deposit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Deposit(int id, Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                
                await _accountService.UpdateTransactionAsync(transaction);
                return RedirectToAction(nameof(Index));
            }
            return View(transaction);
        }


        // GET: Accounts/Deposit/5
        public async Task<IActionResult> Widthdrawal(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var transaction = await _accountService.GetTransactionByIdAsync(id.Value);

            if (transaction == null)
            {
                return NotFound();
            }

            return View(transaction);
        }

        // POST: Accounts/Deposit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Widthdrawal(int id, Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return NotFound();
            }

            var account = await _accountService.GetAccountByIdAsync(transaction.Id);
            if (account.BalanceAmount < transaction.ValueAmount)
            {
                ModelState.AddModelError("ValueAmount", "No hay fondos suficientes para realizar el retiro");
            }

            if (ModelState.IsValid)
            {
                await _accountService.UpdateWithdrawalAsync(transaction);
                return RedirectToAction(nameof(Index));
            }
            return View(transaction);
        }
    }
}
