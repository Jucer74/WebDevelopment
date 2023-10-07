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
            try
            {
                var accounts = await _accountService.GetAccountsAsync();
                return View(accounts);
            }
            catch (Exception)
            {
               
                return View("Error"); 
            }
        }


        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            try
            {
                var account = await _accountService.GetAccountByIdAsync(id.Value);

                if (account == null)
                {
                    return NotFound();
                }

                return View(account);
            }
            catch (Exception ex)
            {
               
                return View("Error"); 
            }

        }

        // GET: Accounts/Create
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Account account)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (_accountService.AccountNumberExists(account.AccountNumber))
                    {
                        ModelState.AddModelError("AccountNumber", "El número de cuenta ya existe.");
                        return View(account);
                    }

                    
                    if (account.AccountType == 'C')
                    {
                        
                        account.BalanceAmount += 1000000; 
                    }

                    
                    if (account.BalanceAmount <= 0)
                    {
                        ModelState.AddModelError("BalanceAmount", "El saldo debe ser mayor a cero.");
                        return View(account);
                    }

                    await _accountService.CreateAccountAsync(account);
                    return RedirectToAction(nameof(Index));
                }
                return View(account);
            }
            catch (Exception ex)
            {
              
                return View("Error"); 
            }
        }




        // GET: Accounts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            try
            {
                var account = await _accountService.GetAccountByIdAsync(id.Value);

                if (account == null)
                {
                    return NotFound();
                }

                return View(account);
            }
            catch (Exception ex)
            {
               
                return View("Error"); 
            }
        }

        // POST: Accounts/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Account account)
        {
            if (id != account.Id)
            {
                return NotFound();
            }

            try
            {
                if (ModelState.IsValid)
                {
                    await _accountService.UpdateAccountAsync(account);
                    return RedirectToAction(nameof(Index));
                }
                return View(account);
            }
            catch (Exception ex)
            {
                return View("Error"); 
            }
        }

        // GET: Accounts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            try
            {
                var account = await _accountService.GetAccountByIdAsync(id.Value);

                if (account == null)
                {
                    return NotFound();
                }

                return View(account);
            }
            catch (Exception ex)
            {
                
                return View("Error"); 
            }
        }

        // POST: Accounts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            try
            {
                await _accountService.DeleteAccountAsync(id);
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
               
                return View("Error"); 
            }
        }

        public async Task<IActionResult> Deposit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            try
            {
                var transaction = await _accountService.GetTransactionForDepositAsync(id.Value);

                if (transaction == null)
                {
                    return NotFound();
                }

                return View(transaction);
            }
            catch (Exception ex)
            {
                return View("Error");
            }
        }

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
                try
                {
                    await _accountService.DepositFundsAsync(transaction);
                    return RedirectToAction(nameof(Index));
                }
                catch (Exception ex)
                {
                    return View("Error");
                }
            }
            return View(transaction);
        }













        public async Task<IActionResult> Widthdrawal(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            try
            {
                var transaction = await _accountService.GetTransactionForDepositAsync(id.Value);

                if (transaction == null)
                {
                    return NotFound();
                }

                return View(transaction);
            }
            catch (Exception ex)
            {
                // Manejo de errores si es necesario
                return View("Error");
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Widthdrawal(int id, Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    // Verifica si hay fondos suficientes antes de realizar el retiro
                    var account = await _accountService.GetAccountByIdAsync(id);
                    if (account == null)
                    {
                        return NotFound();
                    }

                    if (transaction.ValueAmount > account.BalanceAmount)
                    {
                        ModelState.AddModelError("ValueAmount", "Fondos insuficientes para realizar el retiro.");
                        return View(transaction);
                    }

                    await _accountService.WithdrawalFundsAsync(transaction);
                    return RedirectToAction(nameof(Index));
                }
                catch (Exception ex)
                {
                    
                    return View("Error");
                }
            }
            return View(transaction);
        }

       
    }
}
