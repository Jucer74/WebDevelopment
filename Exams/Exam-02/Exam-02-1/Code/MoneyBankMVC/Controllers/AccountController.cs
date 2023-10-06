using Microsoft.AspNetCore.Mvc;
using MoneyBankMVC.Models;
using MoneyBankMVC.Services;

namespace MoneyBankMVC.Controllers
{
    public class AccountController : Controller
    {
        private readonly AccountService _accountService;
        
        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }
        // GET: Account
        public async Task<ActionResult> Index()
        {
            var accounts = await _accountService.GetAll();
            return View(accounts);
        }

        // GET: Account/Details/5
        public async Task<ActionResult> Details(int id)
        {
            var account = await _accountService.GetById(id);

            return View(account);
        }

        // GET: Account/Create
        public ActionResult Create()
        {
            var createdAccount = new Account();
            // next id is #accounts + 1
            //createdAccount.Id = _accountService.GetAll().Result.Count + 1;
            // max id + 1
            createdAccount.Id = _accountService.GetAll().Result.Max(a => a.Id) + 1;
            createdAccount.CreationDate = DateTime.Now;
            return View(createdAccount);
        }

        // POST: Account/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(Account account)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var createdAccount = await _accountService.CreateAccount(account);
                }
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Account/Edit/5
        public ActionResult Edit(int id)
        {
            var account = _accountService.GetById(id);
            return View(account);
        }

        // POST: Account/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Account account)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var updatedAccount = _accountService.UpdateAccount(account);
                    return View(updatedAccount);
                }
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Account/Delete/5
        public ActionResult Delete(int id)
        {
            var willDelete = _accountService.Delete(id);

            return View(willDelete);
        }

        // POST: Account/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(Account account)
        {
            try
            {
                Task<bool> deleted = _accountService.Delete(account.Id);
                // check if true
                if (deleted.Result)
                {
                    return RedirectToAction(nameof(Index));
                }
                else{
                    return NotFound();
                    
                }
            }
            catch
            {
                return View();
            }
        }
        
        // GET: Account/Deposit/5
        public ActionResult Deposit(int id)
        {
            var account = _accountService.GetById(id);
            return View(account);
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Deposit(Account account)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    // var updatedAccount = _accountService.UpdateAccount(account);
                    return RedirectToAction(nameof(Index));
                }

                return View(account);
            }
            catch
            {
                return View();
            }
        }
        
        // GET: Account/Withdraw/5
        public ActionResult Withdraw(int id)
        {
            var account = _accountService.GetById(id);
            return View(account);
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Withdraw(Account account)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    // var updatedAccount = _accountService.UpdateAccount(account);
                    return RedirectToAction(nameof(Index));
                }
                return View(account);
            }
            catch
            {
                return View();
            }
        }
        
        
    }
}