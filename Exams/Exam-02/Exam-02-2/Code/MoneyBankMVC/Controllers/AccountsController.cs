
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

        // GET: Accounts
        public ActionResult Index()
        {
            var AccountList = _accountService.GetAll();
            return View(AccountList);

            /*return _context.Accounts != null ? 
                          View(await _context.Accounts.ToListAsync()) :
                          Problem("Entity set 'AppDbContext.Accounts'  is null.");*/
        }

        // GET: Accounts/Details/5
        public ActionResult Details(int id)
        {
            var AccountForDetails = _accountService.GetById(id);

            return View(AccountForDetails);

            /*if (id == null || _context.Accounts == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts
                .FirstOrDefaultAsync(m => m.Id == id);
            if (account == null)
            {
                return NotFound();
            }

            return View(account);*/
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
        public ActionResult Create( Account account)
        {
            var ValidBalance = _accountService.Create(account);

            if (ValidBalance)
            {
                return RedirectToAction(nameof(Index));
            }
            else
            {
                return View(account);
            }

            /*if (ModelState.IsValid)
            {
                _context.Add(account);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(account);*/
        }

        // GET: Accounts/Edit/5
        public ActionResult Edit(int id)
        {

            var accountToEdit = _accountService.GetById(id);
            return View(accountToEdit);

            /*if (id == null || _context.Accounts == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return View(account);*/
        }

        // POST: Accounts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Account account)
        {

            _accountService.Edit(id, account);
            return RedirectToAction(nameof(Index));

            /*if (id != account.Id)
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
            return View(account);*/
        }

        // GET: Accounts/Delete/5
        public ActionResult Delete(int id)
        {

            var accountToDelete = _accountService.GetById(id);

            /*if (id == null || _context.Accounts == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts
                .FirstOrDefaultAsync(m => m.Id == id);
            if (account == null)
            {
                return NotFound();
            }*/

            return View(accountToDelete);
        }

        // POST: Accounts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id, Account account)
        {

            _accountService.Delete(id, account);

            /*
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
            */

            return RedirectToAction(nameof(Index));
            
        }

        // GET: Accounts/Edit/5
        public ActionResult Deposit(int id)
        {

            var accountForDeposit = _accountService.GetById(id);
            Transaction Operation = MapTransaction(accountForDeposit);
            return View(Operation);

            /*if (id == null || _context.Accounts == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return View(account);*/
        }

        // POST: Accounts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Deposit(int id, Transaction Operation)
        {
            var account = MapAccount(Operation);
            _accountService.Deposit(id, account, Operation.ValueAmount);
            return RedirectToAction(nameof(Index));

            /*if (id != account.Id)
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
            return View(account);*/
        }

        // GET: Accounts/Edit/5
        public ActionResult Withdrawal(int id)
        {

            var accountForWithdrawal = _accountService.GetById(id);
            Transaction Operation = MapTransaction(accountForWithdrawal);
            return View(Operation);

            /*if (id == null || _context.Accounts == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }
            return View(account);*/
        }

        // POST: Accounts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Withdrawal(int id, Transaction Operation)
        {
            var account = MapAccount(Operation);
            var Donewithdrawal = _accountService.Withdrawal(id, account, Operation.ValueAmount);

            if (!Donewithdrawal)
            {
                ModelState.AddModelError("ValueAmount", "Fondos Insuficientes");
                return View(account);
            }
            else
            {
                return RedirectToAction(nameof(Index));
            }

            /*if (id != account.Id)
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
            return View(account);*/
        }


        private Account MapAccount(Transaction transaction)
        {
            Account account = new Account();

            account.Id = transaction.Id;
            account.AccountType = transaction.AccountType;
            account.AccountNumber = transaction.AccountNumber;
            account.BalanceAmount = transaction.BalanceAmount;
            account.OverdraftAmount = transaction.OverdraftAmount;
            account.CreationDate = transaction.CreationDate;
            account.OwnerName = transaction.OwnerName;

            return account;

        }

        private Transaction MapTransaction(Account accountToDeposit)
        {
            Transaction transaction = new Transaction();

            transaction.Id = accountToDeposit.Id;
            transaction.AccountType = accountToDeposit.AccountType;
            transaction.AccountNumber = accountToDeposit.AccountNumber;
            transaction.BalanceAmount = accountToDeposit.BalanceAmount;
            transaction.OverdraftAmount = accountToDeposit.OverdraftAmount;
            transaction.CreationDate = accountToDeposit.CreationDate;
            transaction.OwnerName = accountToDeposit.OwnerName;

            return transaction;
            
        }

        
    }
}
