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

namespace MoneyBankMVC.Controllers
{
    public class AccountsController : Controller
    {
        private readonly AppDbContext _context;

        public AccountsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: Accounts
        public async Task<IActionResult> Index()
        {
              return _context.Accounts != null ? 
                          View(await _context.Accounts.ToListAsync()) :
                          Problem("Entity set 'AppDbContext.Accounts'  is null.");
        }

        // GET: Accounts/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Accounts == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts
                .FirstOrDefaultAsync(m => m.Id == id);
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
            if (id == null || _context.Accounts == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts.FindAsync(id);
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
            if (id == null || _context.Accounts == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts
                .FirstOrDefaultAsync(m => m.Id == id);
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
            if (id == null || _context.Accounts == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            Transaction transaction = MapTransaction(account);
            transaction.Id = account.Id;

            return View(transaction);
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
                    Account account = MapAccount(transaction);

                    //Aplicar la logica del deposito

                    if (transaction.AccountType == 'A')
                    {
                        transaction.BalanceAmount += transaction.ValueAmount;
                    }
                    else
                    {
                        
                        {
                            transaction.BalanceAmount += transaction.ValueAmount;

                            if (transaction.OverdraftAmount > 0 && transaction.BalanceAmount < 1000000)
                            {
                                transaction.OverdraftAmount = 1000000 - transaction.BalanceAmount;
                            }
                            else
                            {
                                transaction.OverdraftAmount = 0;
                            }
                        }
                        
                        
                    }

                    _context.Update(transaction);
                    await _context.SaveChangesAsync();
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

        // GET: Accounts/Withdrawal
        public async Task<IActionResult> Withdrawal(int? id)
        {
            if (id == null || _context.Accounts == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            Transaction transaction = MapTransaction(account);
            transaction.Id = account.Id;

            return View(transaction);
        }

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
                    Account account = MapAccount(transaction);

                    //Aplicar la logica del retiro

                    if (transaction.AccountType == 'A')
                    {
                        if (transaction.ValueAmount <= transaction.BalanceAmount)
                        {
                            transaction.BalanceAmount -= transaction.ValueAmount;
                        }
                    }
                    else
                    {
                        if (transaction.ValueAmount <= transaction.BalanceAmount)
                        {
                            transaction.BalanceAmount -= transaction.ValueAmount;

                            if (transaction.OverdraftAmount > 0 && transaction.BalanceAmount < 1000000)
                            {
                                transaction.OverdraftAmount = 1000000 - transaction.BalanceAmount;
                            }
                        }
                    }

                    _context.Update(transaction);
                    await _context.SaveChangesAsync();
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

        private bool AccountExists(int id)
        {
          return (_context.Accounts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
