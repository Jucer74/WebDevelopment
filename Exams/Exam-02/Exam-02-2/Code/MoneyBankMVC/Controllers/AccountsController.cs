using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> Create(Account account)
        {
            // Verificar si el número de cuenta ya existe en la base de datos
            bool isAccountNumberUnique = !_context.Accounts.Any(a => a.AccountNumber == account.AccountNumber);

            if (!isAccountNumberUnique)
            {
                ModelState.AddModelError("AccountNumber", "El número de cuenta ya existe.");
            }

            if (ModelState.IsValid)
            {
                InitializeAccount(account);

                _context.Add(account);
                await _context.SaveChangesAsync();
                TempData["SuccessMessage"] = "La creación de la cuenta fue exitosa.";
                return RedirectToAction(nameof(Index));
            }
            return View(account);
        }

        // GET: Accounts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            var account = await GetAccountByIdAsync(id);
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
        public async Task<IActionResult> Edit(int id, Account account)
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
                    TempData["SuccessMessage"] = "La edición de la cuenta fue exitosa.";
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

        // GET: Accounts/Edit/5
        public async Task<IActionResult> Deposit(int? id)
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
        public async Task<IActionResult> Deposit(int id, decimal amount)
        {
            var account = await GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            if (amount <= 0)
            {
                ModelState.AddModelError("amount", "El monto del depósito debe ser mayor a cero.");
                return View("Deposit", account);
            }

            PerformDeposit(account, amount);
            await _context.SaveChangesAsync();
            TempData["SuccessMessage"] = "El depósito fue exitoso.";
            return RedirectToAction(nameof(Index));
        }

        // Retirar: Realizar un retiro desde una cuenta
        public async Task<IActionResult> Withdrawal(int? id)
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
        public async Task<IActionResult> Withdrawal(int id, decimal amount)
        {
            var account = await GetAccountByIdAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            if (amount <= 0)
            {
                ModelState.AddModelError("amount", "El monto del retiro debe ser mayor a cero.");
                return View("Withdrawal", account);
            }

            if (amount > account.BalanceAmount)
            {
                ModelState.AddModelError("amount", "Fondos insuficientes.");
                return View("Withdrawal", account);
            }

            PerformWithdrawal(account, amount);
            await _context.SaveChangesAsync();
            TempData["SuccessMessage"] = "El retiro fue exitoso.";
            return RedirectToAction(nameof(Index));
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

        private async Task<Account?> GetAccountByIdAsync(int? id)
        {
            if (!id.HasValue) return null;
            return await _context.Accounts.FirstOrDefaultAsync(m => m.Id == id.Value);
        }

        private void InitializeAccount(Account account)
        {
            account.CreationDate = DateTime.Now;

            if (account.AccountType == 'C')
            {
                account.BalanceAmount += Account.MAX_OVERDRAFT;
            }
        }

        private void PerformDeposit(Account account, decimal amount)
        {
            account.BalanceAmount += amount;

            if (account.AccountType == 'C')
            {
                if (account.OverdraftAmount > 0 && account.BalanceAmount < Account.MAX_OVERDRAFT)
                {
                    account.OverdraftAmount = Account.MAX_OVERDRAFT - account.BalanceAmount;
}
                else
                {
                    account.OverdraftAmount = 0;
                }
            }
        }

        private void PerformWithdrawal(Account account, decimal amount)
        {
            account.BalanceAmount -= amount;

            if (account.AccountType == 'C')
            {
                if (account.OverdraftAmount > 0 && account.BalanceAmount < Account.MAX_OVERDRAFT)
                    {
                    account.OverdraftAmount = Account.MAX_OVERDRAFT - account.BalanceAmount;
                    }
            }
        }

        private bool AccountExists(int id)
        {
            return (_context.Accounts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}