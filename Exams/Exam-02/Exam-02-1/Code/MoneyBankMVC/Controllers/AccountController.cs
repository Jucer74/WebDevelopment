using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoneyBankMVC.Models;
using MoneyBankMVC.Services;
using System.Security.Principal;

namespace MoneyBankMVC.Controllers
{
    public class AccountController : Controller
    {
        private readonly AccountService _accountService;

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        // GET: AccountController
        public ActionResult Index()
        {
       
        }

        // GET: AccountController/Details/5
        public ActionResult Details(int id)
        {
            
        }

        // GET: AccountController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: AccountController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Account account)
        {
            try
            {
                _ = _accountService.CreateAccountAsync(account);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: AccountController/Edit/5
        public ActionResult Edit(int id)
        {
            try
            {
                var account = _accountService.GetAccountByIdAsync(id).Result;
                return View(account);
            }
            catch
            {
                return View();
            }
        }

        // POST: AccountController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Account account)
        {
            try
            {
                _ = _accountService.UpdateAccountAsync(id, account);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
        // GET: AccountController/Delete/5
        public ActionResult Delete(int id)
        {
            try
            {
                var account = _accountService.GetAccountByIdAsync(id).Result;
                return View(account);
            }
            catch 
            {
                return View();
            }
        }

        // POST: AccountController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, Account account)
        {
            try
            {
                _ = _accountService.DeleteAccountAsync(id);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
