using BDayReminderMVC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Linq;

namespace BDayReminderMVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly List<Persona> _personasList;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
            _personasList = PersonasController.LoadPersonas(); 
        }

        public IActionResult Index()
        {
            
            return View(_personasList);
        }

       
    }
}
