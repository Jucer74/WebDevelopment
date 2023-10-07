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
        // ACCOUNT NUMBER

        [AcceptVerbs("Get", "Post")]
        public IActionResult IsAccountNumberAvailable(string accountNumber)
        {
            bool isAccountNumberAvailable = !_context.Accounts.Any(a => a.AccountNumber == accountNumber);
            return Json(isAccountNumberAvailable);
        }

        private readonly AppDbContext _context;
        private readonly IAccountService _accountService; // Agrega el campo _accountService

        public AccountsController(AppDbContext context, IAccountService accountService)
        {
            _context = context;
            _accountService = accountService; // Inyecta el servicio
        }

        // GET: Accounts
        public async Task<IActionResult> Index()
        {
            var accounts = await _accountService.GetAllAccountsAsync();
            if (accounts != null)
            {
                return View(accounts);
            }
            else
            {
                return Problem("Entity set 'IAccountService.GetAllAccountsAsync' is null.");
            }
        }


        // GET: Accounts/Details/5
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
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,AccountType,CreationDate,AccountNumber,OwnerName,BalanceAmount,OverdraftAmount")] Account account)
        {
            if (ModelState.IsValid)
            {
                _context.Add(account);
                await _context.SaveChangesAsync();
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
            if (_context.Accounts == null)
            {
                return Problem("Entity set 'AppDbContext.Accounts'  is null.");
            }
            var account = await _context.Accounts.FindAsync(id);
            if (account != null)
            {
                _context.Accounts.Remove(account);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }


        // GET: Accounts/Deposit
        public async Task<IActionResult> Deposit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            int accountId = id.Value; // Obtén el valor int de id (si tiene valor)

            var account = await _accountService.GetAccountByIdAsync(accountId);

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

            if (ModelState.IsValid)
            {
                try
                {
                    // Obtén la cuenta correspondiente desde la base de datos
                    var account = await GetAccountByIdAsync(id);

                    if (account == null)
                    {
                        return NotFound();
                    }

                    // Verifica que el monto del depósito sea válido (por ejemplo, mayor que cero)
                    if (transaction.ValueAmount <= 0)
                    {
                        ModelState.AddModelError("transaction.Amount", "El monto del depósito debe ser mayor que cero.");
                        return View(transaction);
                    }

                    // Llama a la función que realiza el depósito
                    PerformDeposit(account, transaction.ValueAmount);

                    // Actualiza la cuenta en la base de datos
                    _context.Update(account);
                    await _context.SaveChangesAsync();

                    TempData["SuccessMessage"] = "El depósito fue realizado con exito"; 
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AccountExists(transaction.Id))
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
            return View(transaction);
        }

        // Función para realizar el depósito en la cuenta
        private void PerformDeposit(Account account, decimal amount)
        {
            // Verifica que la cuenta y el monto sean válidos antes de realizar el depósito
            if (account != null && amount > 0)
            {
                // Aplica la lógica de depósito: Suma el monto del depósito al saldo de la cuenta
                account.BalanceAmount += amount;
            }
        }

        // Función para obtener una cuenta por su ID
        private async Task<Account> GetAccountByIdAsync(int id)
        {
            return await _context.Accounts.FindAsync(id);
        }



        // GET: Accounts/Withdrawal
        public async Task<IActionResult> Withdrawal(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            int accountId = id.Value; // Obtén el valor int de id (si tiene valor)

            var account = await _accountService.GetAccountByIdAsync(accountId);

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
        public async Task<IActionResult> Withdrawal(int id, Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    // Obtén la cuenta correspondiente desde la base de datos
                    var account = await GetAccountByIdAsync(id);

                    if (account == null)
                    {
                        return NotFound();
                    }

                    // Verifica que el monto del retiro sea válido (por ejemplo, mayor que cero)
                    if (transaction.ValueAmount <= 0)
                    {
                        ModelState.AddModelError("transaction.Amount", "El monto del retiro debe ser mayor que cero.");
                        return View(transaction);
                    }

                    // Verifica que haya fondos suficientes para el retiro
                    if (transaction.ValueAmount > account.BalanceAmount)
                    {
                        ModelState.AddModelError("transaction.Amount", "Fondos insuficientes.");
                        return View(transaction);
                    }

                    // Llama a la función que realiza el retiro
                    PerformWithdraw(account, transaction.ValueAmount);

                    // Actualiza la cuenta en la base de datos
                    _context.Update(account);
                    await _context.SaveChangesAsync();

                    TempData["SuccessMessage"] = "Retiro exitoso."; // Mensaje de éxito
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AccountExists(transaction.Id))
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
            return View(transaction);
        }

        private Account MapAccount(Transaction transaction)
        {
            Account account = new Account();

            account.Id = transaction.Id;
            account.AccountType = transaction.AccountType;
            account.CreationDate = transaction.CreationDate;
            account.AccountNumber = transaction.AccountNumber;
            account.OwnerName = transaction.OwnerName;
            account.BalanceAmount = transaction.BalanceAmount;
            account.OverdraftAmount = transaction.OverdraftAmount;

            return account;
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


        private void PerformWithdraw(Account account, decimal amount)
        {
            account.BalanceAmount -= amount;
        }

        private bool AccountExists(int id)
        {
          return (_context.Accounts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
