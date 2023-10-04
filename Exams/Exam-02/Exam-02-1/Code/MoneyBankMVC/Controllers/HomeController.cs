using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Context;
using MoneyBankMVC.Models;
using System.Diagnostics;

namespace MoneyBankMVC.Controllers
{
    public class HomeController : Controller
    {
 

 
        public IActionResult Index()
        {
            return View();
        }
    }
}
