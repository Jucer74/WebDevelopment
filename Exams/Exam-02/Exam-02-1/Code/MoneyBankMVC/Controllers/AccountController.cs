using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MoneyBankMVC.Models;
using MoneyBankMVC.Services;

namespace MoneyBankMVC.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccountService accountService;

        public AccountController(IAccountService accountService)
        {
            this.accountService = accountService;
        }

        public async Task<IActionResult> ListAccounts()
        {
            var accounts = await accountService.ListAccountsAsync();
            return View(accounts);
        }

        public IActionResult CreateAccount()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccount(AccountModel account)
        {
            if (ModelState.IsValid)
            {
                var result = await accountService.CreateAccountAsync(account);

                if (result)
                {
                    return RedirectToAction("ListAccounts");
                }
                else
                {
                    ModelState.AddModelError("", "Error al crear la cuenta.");
                }
            }

            return View(account);
        }

        public async Task<IActionResult> EditAccount(int id)
        {
            var account = await accountService.GetAccountByIdAsync(id);

            if (account != null)
            {
                return View(account);
            }
            else
            {
                return View("Error");
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditAccount(int id, AccountModel account)
        {
            if (ModelState.IsValid)
            {
                account.Id = id;
                var result = await accountService.EditAccountAsync(account);

                if (result)
                {
                    return RedirectToAction("ListAccounts");
                }
                else
                {
                    ModelState.AddModelError("", "Error al editar la cuenta.");
                }
            }

            return View(account);
        }

        [HttpPost]
        public async Task<IActionResult> DepositToAccount(int id, decimal amount)
        {
            var result = await accountService.DepositToAccountAsync(id, amount);

            if (result)
            {
                return RedirectToAction("ListAccounts");
            }
            else
            {
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> WithdrawFromAccount(int id, decimal amount)
        {
            var result = await accountService.WithdrawFromAccountAsync(id, amount);

            if (result)
            {
                return RedirectToAction("ListAccounts");
            }
            else
            {
                return View("Error");
            }
        }

        public async Task<IActionResult> GetAccountInfo(int id)
        {
            var account = await accountService.GetAccountByIdAsync(id);

            if (account != null)
            {
                return View(account);
            }
            else
            {
                return View("Error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            var result = await accountService.DeleteAccountAsync(id);

            if (result)
            {
                return RedirectToAction("ListAccounts");
            }
            else
            {
                return View("Error");
            }
        }
    }
}
