using EmployeesWeb.Application.Mappers;
using EmployeesWeb.Application.Models;
using EmployeesWeb.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;

namespace EmployeesWeb.Application.Controllers
{
   public class HomeController : Controller
   {
      private readonly LoginService loginService;
      public HomeController(IConfiguration configuration)
      {
         var baseUrl = configuration["ApiConfiguration:BaseUrl"].ToString();
         loginService = new LoginService(baseUrl);
      }

      public IActionResult Index()
      {
         ViewData["IsUserLogged"] = HttpContext.Session.GetString("IsUserLogged");
         ViewData["User"] = HttpContext.Session.GetString("User");
         return View();
      }

      public IActionResult Privacy()
      {
         return View();
      }

      [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
      public IActionResult Error()
      {
         return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
      }

      [HttpGet]
      [Route("[controller]/[action]")]
      public IActionResult Login()
      {
         return View();
      }

      [HttpPost]
      [ValidateAntiForgeryToken]
      public async Task<IActionResult> Login(Login login)
      {
         try
         {
            if (ModelState.IsValid)
            {
               // Llamar a la API para validar el Login
               if (await IsValidUser(login))
               {
                  return Redirect(nameof(Index));
               }
               ModelState.AddModelError(string.Empty, "Intento de inicio de sesión no válido.");
            }
         }
         catch (Exception ex)
         {
            ModelState.AddModelError(string.Empty, ex.Message);
         }
         return View();
      }

      public IActionResult Logout()
      {
         HttpContext.Session.SetString("IsUserLogged", "false");
         return RedirectToAction(nameof(Index));
      }

      private async Task<bool> IsValidUser(Login login)
      {
         var autorizationDto = await loginService.ValidUser(LoginMapper.ToDto(login));
         if (autorizationDto == null)
         {
            HttpContext.Session.SetString("IsUserLogged", "false");
            return false;
         }
         HttpContext.Session.SetString("IsUserLogged", "true");
         HttpContext.Session.SetString("User", login.Email);
         HttpContext.Session.SetString("AccessToken", JsonConvert.SerializeObject(autorizationDto.AccessToken));

         return true;
      }
   }
}