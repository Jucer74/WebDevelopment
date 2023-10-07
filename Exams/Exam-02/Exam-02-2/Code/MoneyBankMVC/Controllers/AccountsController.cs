

using Microsoft.AspNetCore.Mvc;
using MoneyBankMVC.Models;
using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Services;
using MoneyBankMVC.Context;

namespace MoneyBankMVC.Controllers
{
    public class AccountsController : Controller
    {
        

        private readonly IAccountService _accountService;
        public AccountsController( IAccountService accountService)
        {
            
            _accountService = accountService;
        }

        // GET: Accounts
        public IActionResult Index()
        {
            var ListAccount = _accountService.GetAll();
            
              return View(ListAccount);
        }

        // GET: Accounts/Details/5
        public IActionResult Details(int id)
        {
            var Details =_accountService.GetById(id);

            return View(Details);
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
        public IActionResult Create(Account account)
        {
            bool Exists = _accountService.AccountExists(account.AccountNumber);

            if (!Exists)
            {

                var ValidBalance = _accountService.Create(account);

                if (ValidBalance)
                {
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    ModelState.AddModelError("BalanceAmount", "El Balance debe ser Mayor a 0.00");
                    return View(account);
                }


            }
            else
            {

                ModelState.AddModelError("AccountNumber", "El número de cuenta ya existe en la base de datos");
                return View(account);
            }
        }

        // GET: Accounts/Edit/5
        public IActionResult Depost(int id)
        {
            var Depost = _accountService.GetById(id);
            Transaction DepositTransaction = MapTrasaction(Depost);
            return View(DepositTransaction);
        }

        // POST: Accounts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Depost(int id, Transaction despositAmount )
        {
            var Deposit = MapAccount(despositAmount);
            _accountService.Deposit(id, Deposit, despositAmount.ValueAmount);
            return RedirectToAction(nameof(Index));
        }
        // GET: Accounts/Edit/5
        public IActionResult Retiro(int id)
        {
            var Depost = _accountService.GetById(id);
            Transaction DepositTransaction = MapTrasaction(Depost);
            return View(DepositTransaction);
        }

        // POST: Accounts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Retiro(int id, Transaction despositAmount)
        {
            var Deposit = MapAccount(despositAmount);
            _accountService.Withdrawal(id, Deposit, despositAmount.ValueAmount);
            return RedirectToAction(nameof(Index));
        }
        // GET: Accounts/Delete/5
        public IActionResult Delete(int id)
        {
            var Delete = _accountService.GetById(id);
       
            return View(Delete);

        }

        // POST: Accounts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id, Account account)
        {
            _accountService.Delete(id,account);
            return RedirectToAction(nameof(Index));
        }

        // GET: Accounts/Create
        public IActionResult Edit(int id)
        {
          var Edit = _accountService.GetById(id);
            return View(Edit);
           
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Account account)
        {
            _accountService.Edit(id, account);
            return RedirectToAction(nameof(Index));
        }
        private Account MapAccount(Transaction transaction )
        {
            Account account = new Account();

            account.Id = transaction.Id;
            account.AccountType= transaction.AccountType;
            account.AccountNumber = transaction.AccountNumber;
            account.BalanceAmount = transaction.BalanceAmount;
            account.OverdraftAmount = transaction.OverdraftAmount;
            account.CreationDate = transaction.CreationDate;
            account.OwnerName = transaction.OwnerName;

            return account;

        }
        private Transaction MapTrasaction(Account accountToDeposit)
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
