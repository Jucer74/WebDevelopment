using ConsumeWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Text;

namespace ConsumeWebAPI.Controllers
{
    public class AccountController : Controller
    {

        Uri baseAddress = new Uri("http://localhost:8000/api/v1");
        private static List<AccountViewModel> accountList = null!;
        private readonly HttpClient _client;

        public AccountController()
        {
            _client = new HttpClient();
            _client.BaseAddress = baseAddress;
        }
        [HttpGet]
        // GET: AccountController
        public IActionResult Index()
        {
            List<AccountViewModel> accountList = new List<AccountViewModel>();
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + "/accounts").Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                accountList = JsonConvert.DeserializeObject<List<AccountViewModel>>(data);
            }


            return View(accountList);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(AccountViewModel account)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    HttpResponseMessage response = _client.PostAsJsonAsync(_client.BaseAddress + "/accounts", account).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        return RedirectToAction("Account");
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Error al crear la cuenta. Por favor, inténtalo de nuevo.");
                    }
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError(string.Empty, "Error: " + ex.Message);
                }
            }

            // Si hay errores de validación o la creación falla, regresa a la vista Create con los errores.
            return View(account);
        }


        public IActionResult Delete(int id)
        {
            HttpResponseMessage response = _client.DeleteAsync(_client.BaseAddress + $"/accounts/{id}").Result;

            if (response.IsSuccessStatusCode)
            {
                return RedirectToAction("Account");
            }

            return RedirectToAction("Account");
        }

        public IActionResult Edit(int id)
        {
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + $"/accounts/{id}").Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                var account = JsonConvert.DeserializeObject<AccountViewModel>(data);
                return View(account);
            }

            return RedirectToAction("Account");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(AccountViewModel account)
        {
            if (ModelState.IsValid)
            {
                HttpResponseMessage response = _client.PutAsJsonAsync(_client.BaseAddress + $"/accounts/{account.Id}", account).Result;

                if (response.IsSuccessStatusCode)
                {
                    return RedirectToAction("Account");
                }
            }

            return View(account);
        }

        public IActionResult Details(int id)
        {
            HttpResponseMessage response = _client.GetAsync(_client.BaseAddress + $"/accounts/{id}").Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                var account = JsonConvert.DeserializeObject<AccountViewModel>(data);
                return View(account);
            }

            return RedirectToAction("Account");
        }


    }
}
