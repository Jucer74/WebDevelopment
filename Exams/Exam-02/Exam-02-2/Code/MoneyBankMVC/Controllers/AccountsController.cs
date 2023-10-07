using System;
using System.Collections.Generic;
using System.Linq;
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
        //NUEVO
        private readonly IAccountService _accountService;

        public AccountsController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        // GET: Accounts
        public async Task<IActionResult> Index()
        {

            var accounts = await _accountService.GetAllAccounts();
            return View(accounts);
        }

        // GET: Accounts/Details/5
        public async Task<IActionResult> Details(int id)
        {
            var account = await _accountService.GetAccountById(id);
            
            return View(account);
        }

        // GET: Accounts/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Accounts/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,AccountType,CreationDate,AccountNumber,OwnerName,BalanceAmount,OverdraftAmount")] Account account)
        {
            if (ModelState.IsValid)
            {
                if (account.BalanceAmount <= 0)
                {
                    ModelState.AddModelError("BalanceAmount", "El valor de balance debe ser mayor a cero.");
                    return View(account);
                }

                if (await _accountService.AccountNumberExists(account.AccountNumber))
                {
                    ModelState.AddModelError("AccountNumber", "El número de cuenta ya existe.");
                    return View(account);
                }

                if (account.AccountType == 'C')
                {
                    account.BalanceAmount += 1000000;
                    account.OverdraftAmount = 1000000;
                }

                await _accountService.CreateAccount(account);
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

            var account = await _accountService.GetAccountById(id.Value);
            if (account == null)
            {
                return NotFound();
            }

            return View(account);
        }

        // POST: Accounts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
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
                    await _accountService.UpdateAccount(account);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!await AccountExists(account.Id))
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

        // GET: Accounts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id is null)
            {
                return NotFound();
            }

            var account = await _accountService.GetAccountById(id.Value);

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


            await _accountService.DeleteAccount(id);
            return RedirectToAction(nameof(Index));

        }

        


        public async Task<IActionResult> Deposit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var account = await _accountService.GetAccountById(id.Value);
            if (account == null)
            {
                return NotFound();
            }

            Transaction transaction = MapTransaction(account);

            return View(transaction);
        }


        // POST: Accounts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Deposit(int id, Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return NotFound();
            }

            var success = await _accountService.Deposit(transaction);

            if (!success)
            {
                return NotFound();
            }

            return RedirectToAction(nameof(Index));
        }


        private Transaction MapTransaction(Account account)
        {
            Transaction transaction = new Transaction();
            transaction.Id = account.Id;
            transaction.AccountType = account.AccountType;
            transaction.CreationDate = account.CreationDate;
            transaction.AccountNumber = account.AccountNumber;
            transaction.OwnerName = account.OwnerName;
            transaction.BalanceAmount = account.BalanceAmount;
            transaction.OverdraftAmount = account.OverdraftAmount;

            return transaction;

        }


        public async Task<IActionResult> Withdrawal(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var account = await _accountService.GetAccountById(id.Value);
            if (account is null)
            {
                return NotFound();
            }

            Transaction transaction = MapTransaction(account);

            return View(transaction);
        }


        // POST: Accounts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Withdrawal(int id, Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return NotFound();
            }

            var account = await _accountService.GetAccountById(id);

            if (account == null)
            {
                return NotFound();
            }

            var success = await _accountService.Withdrawal(transaction, account);

            if (!success)
            {
                ModelState.AddModelError(string.Empty, "No tiene suficiente saldo para realizar esta operación.");
                return View(transaction);
            }

            return RedirectToAction(nameof(Index));
        }


        private async Task<bool> AccountExists(int id)
        {
            var account = await _accountService.GetAccountById(id);
            return account != null;
        }
    }
}
