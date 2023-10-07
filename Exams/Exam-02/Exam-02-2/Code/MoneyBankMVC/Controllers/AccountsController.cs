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
            // Verifica si el número de cuenta ya existe en la base de datos
            bool accountExists = _accountService.AccountExists(account.AccountNumber);

            if (accountExists)
            {
                // Número de cuenta ya existe, muestra un mensaje de error
                ModelState.AddModelError("AccountNumber", "El número de cuenta ya existe");
                return View(account); // Devuelve la vista de creación con errores
            }
            else
            {
                // Número de cuenta no existe, procede a crear la cuenta
                
                var ValidBalance = _accountService.Crear(account);

                if (ValidBalance)
                {
                    return RedirectToAction(nameof(Index));
                }
                else
                {
                    ModelState.AddModelError("BalanceAmount", "El Balance debe ser Mayor a Cero");
                    return View(account); // Devuelve la vista de creación con errores
                }
                
            }
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
            Transaction DepositTransaction = _accountService.MapTransaction(accountToDeposit);
            return View(DepositTransaction);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Deposit(int id, Transaction depositTransaction)
        {
            var account = _accountService.MapAccount(depositTransaction);
            _accountService.Depositar(id, account, depositTransaction.TransactionAmount);
            return RedirectToAction(nameof(Index));
        }

        // GET: Accounts/Delete/5
        public IActionResult Withdrawal(int id)
        {
            var accountToWithDrawal = _accountService.Informacion(id);
            Transaction DepositTransaction = _accountService.MapTransaction(accountToWithDrawal);
            return View(DepositTransaction);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Withdrawal(int id, Transaction withdrawalTransaction)
        {
            var account = _accountService.MapAccount(withdrawalTransaction);
            var Donewithdrawal = _accountService.Retirar(id, account, withdrawalTransaction.TransactionAmount);

            if (!Donewithdrawal)
            {
                ModelState.AddModelError("TransactionAmount", "Fondos Insuficientes");
                return View(account);
            }
            else
            {
                return RedirectToAction(nameof(Index));
            }
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