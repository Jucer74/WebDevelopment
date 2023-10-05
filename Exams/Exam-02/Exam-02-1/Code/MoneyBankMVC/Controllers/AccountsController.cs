using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Models;
using MoneyBankMVC.Services;


namespace MoneyBankMVC.Controllers
{
    public class AccountsController : Controller
    {
        private readonly IAccountService _accountService;
        private const decimal MAX_OVERDRAFT = 1000000.00m;


        public AccountsController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        // GET: Accounts
        public async Task<IActionResult> Index()
        {
            var accounts = await _accountService.GetAllAccountsAsync();
            return View(accounts);
        }

        // GET: Accounts/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var account = await _accountService.GetAccountByIdAsync(id.Value);

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

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,AccountType,AccountNumber,CreationDate,OwnerName,BalanceAmount,OverdraftAmount")] Account account)
        {
            if (ModelState.IsValid)
            {
                if (account.BalanceAmount <= 0)
                {
                    ModelState.AddModelError("BalanceAmount", "El balance debe ser mayor a cero.");
                    return View(account);
                }

                if (account.AccountType == 'C')
                {
                    account.BalanceAmount += MAX_OVERDRAFT;
                }

                await _accountService.CreateAccountAsync(account);
                return RedirectToAction(nameof(Index));
            }
            return View(account);
        }

        // GET: Accounts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var account = await _accountService.GetAccountByIdAsync(id.Value);

            if (account == null)
            {
                return NotFound();
            }

            return View(account);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,AccountType,AccountNumber,CreationDate,OwnerName,BalanceAmount,OverdraftAmount")] Account account)
        {
            if (id != account.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    await _accountService.UpdateAccountAsync(account);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!await _accountService.AccountExistsAsync(account.Id))
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
            return View(account);
        }

        // GET: Accounts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var account = await _accountService.GetAccountByIdAsync(id.Value);

            if (account == null)
            {
                return NotFound();
            }

            return View(account);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var accountExists = await _accountService.AccountExistsAsync(id);

            if (!accountExists)
            {
                return Problem("Entity set 'MoneyBankContext.Accounts' is null.");
            }

            await _accountService.DeleteAccountAsync(id);

            return RedirectToAction(nameof(Index));
        }

        [HttpPut("Accounts/{id}/Deposit")]
        public async Task<IActionResult> Deposit(int id, [FromBody] DepositRequest request)
        {
            if (request.ValueAmount <= 0)
            {
                return BadRequest("El valor del depósito debe ser mayor que cero.");
            }

            try
            {
                await _accountService.DepositAsync(id, request.ValueAmount);
                return Ok("Depósito exitoso.");
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Accounts/{id}/Withdraw")]
        public async Task<IActionResult> Withdraw(int id, [FromBody] WithdrawalRequest request)
        {
            if (request.ValueAmount <= 0)
            {
                return BadRequest("El valor de retiro debe ser mayor que cero.");
            }

            try
            {
                await _accountService.WithdrawAsync(id, request.ValueAmount);
                return Ok("Retiro exitoso.");
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public class DepositRequest
        {
            public decimal ValueAmount { get; set; }
        }

        public class WithdrawalRequest
        {
            public decimal ValueAmount { get; set; }
        }
    }
}
