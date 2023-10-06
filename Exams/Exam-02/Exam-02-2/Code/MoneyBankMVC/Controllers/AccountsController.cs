using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Models;
using MoneyBankMVC.Services;

namespace MoneyBankMVC.Controllers
{
    public class AccountsController : Controller
    {
        private readonly IAccountService _accountService;
        public AccountsController(IAccountService accountService) {
            _accountService = accountService;
        }
        // GET: Accounts
        public IActionResult Index()
        {
            var accountList = _accountService.Listar();
            return View(accountList);
        }

        // GET: Accounts/Details/5
        public IActionResult Details(int id)
        {
            var accountToDetails = _accountService.Informacion(id);
            return View(accountToDetails);
        }

        // GET: Accounts/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Accounts/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Account account)
        {
            _accountService.Crear(account);
            return RedirectToAction(nameof(Index));
        }

        // GET: Accounts/Edit/5
        public IActionResult Edit(int id)
        {
            var accountToEdit = _accountService.Informacion(id);
            return View(accountToEdit);
        }

        // POST: Accounts/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Account account)
        {
            _accountService.Editar(id, account);
            return RedirectToAction(nameof(Index));
        }

        // GET: Accounts/Delete/5
        public IActionResult Deposit(int id)
        {
            var accountToDeposit = _accountService.Informacion(id);
            return View(accountToDeposit);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Deposit(int id, Account account, int depositAmount)
        {
            Console.WriteLine("Valor del depósito: " + depositAmount);

            return RedirectToAction(nameof(Index));
        }

        // GET: Accounts/Delete/5
        public IActionResult Delete(int id)
        {
            var accountToDelete = _accountService.Informacion(id);
            return View(accountToDelete);
        }

        // POST: Accounts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(int id, Account account)
        {
            _accountService.Eliminar(id, account);
            return RedirectToAction(nameof(Index));
        }
    }
}
