
using Microsoft.AspNetCore.Mvc;
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

        // GET: Accounts
        public IActionResult Index()
        {
            var AccountList = _accountService.GetAll();
            return View(AccountList);
        }

        // GET: Accounts/Details/5
        public IActionResult Details(int id)
        {
            var AccountForDetails = _accountService.GetById(id);

            return View(AccountForDetails);

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
        public IActionResult Create([Bind("Id,AccountType,CreationDate,AccountNumber,OwnerName,BalanceAmount,OverdraftAmount")] Account account)
        {

            bool accountExists = _accountService.AccountExists(account.AccountNumber);

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
        public IActionResult Edit(int id)
        {

            var accountToEdit = _accountService.GetById(id);


            /*if (id == null || _context.Accounts == null)
            {
                return NotFound();
            }

            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }*/

            return View(accountToEdit);
        }

        // POST: Accounts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, [Bind("Id,AccountType,CreationDate,AccountNumber,OwnerName,BalanceAmount,OverdraftAmount")] Account account)
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
        public IActionResult Delete(int id)
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
        public IActionResult DeleteConfirmed(int id, Account account)
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

        public IActionResult Deposit(int id)
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
        public IActionResult Deposit(int id, [Bind("Id,AccountType,CreationDate,AccountNumber,OwnerName,BalanceAmount,OverdraftAmount,ValueAmount")] Transaction Operation)
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
        public IActionResult Withdrawal(int id)
        {

            var accountForWithdrawal = _accountService.GetById(id);
            Transaction Operation = MapTransaction(accountForWithdrawal);

            /*if (Operation.ValueAmount > accountForWithdrawal.BalanceAmount)
            {
               return(Error) 
            }*/

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
        public IActionResult Withdrawal(int id, Transaction Operation)
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
