using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MoneyBankMVC.Models;

namespace MoneyBankMVC.Controllers
{
    public class AccountsController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _apiBaseUrl;

        public AccountsController(IConfiguration configuration)
        {
            _configuration = configuration;
            _apiBaseUrl = _configuration["AccountsAPIUrl"];
        }



        // GET: Accounts
        public async Task<IActionResult> Index()
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync($"{_apiBaseUrl}/api/accounts");
                if (response.IsSuccessStatusCode)
                {
                    var accounts = await response.Content.ReadFromJsonAsync<Account[]>();
                    return View(accounts);
                }
                else
                {
                    return View(new Account[0]);
                }
            }
        }

        // GET: Accounts/Details/5
        public async Task<IActionResult> Details(int id)
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync($"{_apiBaseUrl}/api/accounts/{id}");
                if (response.IsSuccessStatusCode)
                {
                    var account = await response.Content.ReadFromJsonAsync<Account>();
                    return View(account);
                }
                else
                {
                    return NotFound();
                }
            }
        }

        // GET: Accounts/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Accounts/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Account account)
        {
            if (ModelState.IsValid)
            {
                using (var client = new HttpClient())
                {
                    HttpResponseMessage response = await client.PostAsJsonAsync($"{_apiBaseUrl}/api/accounts", account);
                    if (response.IsSuccessStatusCode)
                    {
                        var newAccount = await response.Content.ReadFromJsonAsync<Account>();
                        return RedirectToAction("Details", new { id = newAccount.Id });
                    }
                    else
                    {
                        return View(account);
                    }
                }
            }
            return View(account);
        }

        // GET: Accounts/Edit/5
        public async Task<IActionResult> Edit(int id)
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync($"{_apiBaseUrl}/api/accounts/{id}");
                if (response.IsSuccessStatusCode)
                {
                    var account = await response.Content.ReadFromJsonAsync<Account>();
                    return View(account);
                }
                else
                {
                    return NotFound();
                }
            }
        }
        // POST: Accounts/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Account account)
        {
            // Convierte account.Id a int
            if (id != int.Parse(account.Id))
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                using (var client = new HttpClient())
                {
                    HttpResponseMessage response = await client.PutAsJsonAsync($"{_apiBaseUrl}/api/accounts/{id}", account);
                    if (response.IsSuccessStatusCode)
                    {
                        return RedirectToAction("Details", new { id = account.Id });
                    }
                    else
                    {
                        return View(account);
                    }
                }
            }
            return View(account);
        }


        // GET: Accounts/Delete/5
        public async Task<IActionResult> Delete(int id)
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync($"{_apiBaseUrl}/api/accounts/{id}");
                if (response.IsSuccessStatusCode)
                {
                    var account = await response.Content.ReadFromJsonAsync<Account>();
                    return View(account);
                }
                else
                {
                    return NotFound();
                }
            }
        }

        // POST: Accounts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            using (var client = new HttpClient())
            {
                HttpResponseMessage response = await client.DeleteAsync($"{_apiBaseUrl}/api/accounts/{id}");
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    return RedirectToAction("Delete", new { id = id });
                }
            }
        }
    }
}
