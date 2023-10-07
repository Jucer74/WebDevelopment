using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Models;
using MoneyBankMVC.Services;

namespace MoneyBankMVC.Controllers
{
    public class AccountsController : Controller
    {
        //private readonly AppDbContext _context;
        private readonly IAccountService _accountService;

        //public AccountsController(AppDbContext context, IAccountService accountService)
        public AccountsController(IAccountService accountService)
        {
            //_context = context;
            _accountService = accountService;
        }

        // GET: Accounts
        public async Task<IActionResult> Index()
        {
            //return _context.Accounts != null ?
            //            View(await _context.Accounts.ToListAsync()) :
            //            Problem("Entity set 'AppDbContext.Accounts'  is null.");
            var accounts = await _accountService.GetAccountsAsync();
            return View(accounts);
        }

        // GET: Accounts/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            //if (id == null || _context.Accounts == null)
            if (id == null)
            {
                return NotFound();
            }

            //var account = await _context.Accounts
            //    .FirstOrDefaultAsync(m => m.Id == id);

            var account =await  _accountService.FindAccountAsync(id);
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
                //_context.Add(account);
                //await _context.SaveChangesAsync();

                await _accountService.CreateAccountAsync(account);
                return RedirectToAction(nameof(Index));
            }
            return View(account);
        }

        // GET: Accounts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null )
            {
                return NotFound();
            }

            //var account = await _context.Accounts.FindAsync(id);

            var account = await _accountService.FindAccountAsync(id);

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
                //try
                //{
                //    _context.Update(account);
                //    await _context.SaveChangesAsync();
                //}
                //catch (DbUpdateConcurrencyException)
                //{
                //    if (!AccountExists(account.Id))
                //    {
                //        return NotFound();
                //    }
                //    else
                //    {
                //        throw;
                //    }
                //}

                // Si la Cuenta No Existe
                // Retornar Error de Validacion
                if (!_accountService.AccountExists(id))
                {
                    return NotFound();
                }

                // Llamar al Servicio para Hacer el Update
                await _accountService.EditAccountAsync(id, account);

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

            //var account = await _context.Accounts.FirstOrDefaultAsync(m => m.Id == id);
            var account = await _accountService.FindAccountAsync(id);

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
            //if (_context.Accounts == null)
            //{
            //    return Problem("Entity set 'AppDbContext.Accounts'  is null.");
            //}

            //var account = await _context.Accounts.FindAsync(id);
            //if (account != null)
            //{
            //    _context.Accounts.Remove(account);
            //}


            var account = await _accountService.FindAccountAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            //_context.Accounts.Remove(account);
            //await _context.SaveChangesAsync();

            await _accountService.DeleteAccountAsync(account);

            return RedirectToAction(nameof(Index));
        }

        //private bool AccountExists(int id)
        //{
        //    return (_context.Accounts?.Any(e => e.Id == id)).GetValueOrDefault();
        //}

        public async Task<IActionResult> Deposit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }


            //var account = await _context.Accounts.FindAsync(id);
            var account = await _accountService.FindAccountAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            Transaction transaction = MapTransaction(account);

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

                var account = await _accountService.FindAccountAsync(id);
                if (account == null)
                {
                    return NotFound();
                }

                await _accountService.DepositAsync(account, transaction);

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
    }
}