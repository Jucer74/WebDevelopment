using Microsoft.AspNetCore.Mvc;
using MoneyBankMVC.Models;
using MoneyBankMVC.Services;
using System;
using System.Security.Principal;
using System.Threading.Tasks;

namespace MoneyBankMVC.Controllers
{
    public class AccountsController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountsController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        public async Task<ActionResult> Index()
        {
            var accountsList = await _accountService.GetAll();
            return View(accountsList);
        }

        public async Task<ActionResult> Details(int id)
        {
            var account = await _accountService.GetById(id);
            return View(account);
        }

        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Account account)
        {
            try
            {
                _accountService.Create(account);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        public async Task<ActionResult> EditAsync(int id)
        {

            var account = await _accountService.GetById(id);
            return View(account);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Account account)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _accountService.Update(id, account);
                    return RedirectToAction(nameof(Index));
                }
                // Model is not valid, return to the Edit view
                return View(account);
            }
            catch
            {
                return View();
            }
        }


        public async Task<ActionResult> DeleteAsync(int id)
        {
            var account = await _accountService.GetById(id);
            return View(account);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, Account account)
        {
            try
            {
                _accountService.DeleteById(id);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        public async Task<ActionResult> Deposit(int id)
        {
            var account = await _accountService.GetById(id);
            return View(account);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Deposit(int id, decimal amount)
        {
            try
            {
                await _accountService.Deposit(id, amount);
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
              
                return View();
            }
        }

        public ActionResult Withdraw()
        {

            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Withdraw(int id, decimal amount)
        {
            try
            {
                await _accountService.Withdraw(id, amount);
                return RedirectToAction(nameof(Index));
            }
            catch (Exception ex)
            {
          
                return View();
            }
        }
    }
}
