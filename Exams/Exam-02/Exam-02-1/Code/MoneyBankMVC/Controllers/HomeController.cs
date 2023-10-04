using Microsoft.AspNetCore.Mvc;
using MoneyBankMVC.Models;
using MoneyBankMVC.Services;
using System.Diagnostics;

namespace MoneyBankMVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly FastAPIService _fastAPIService;

        public HomeController()
        {
            _fastAPIService = new FastAPIService();
        }

        public IActionResult Index()
        {
            // Consumir FastAPI para crear una cuenta
            var newAccountData = new { AccountType = "Savings", OwnerName = "John Doe", BalanceAmount = 1000.0 };
            var createdAccount = _fastAPIService.Create<Account>("api/Account", newAccountData, _fastAPIService.Get_restClient());

            // Realizar otras operaciones con FastAPI según sea necesario

            return View();
        }

        // Define otras acciones para consumir otras rutas de FastAPI
    }
}
