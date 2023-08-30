using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using MovieRank.Models;
using MovieRank.Services;

public class AccountController : Controller
{
    private readonly UserService _userService;

    public AccountController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Login(string userEmail, string password, string returnUrl = null)
    {
        if (ModelState.IsValid)
        {
            var user = _userService.GetUserByEmail(userEmail);

            if (user != null && user.Password == password)
            {
                var claims = new List<Claim>();

                if (!string.IsNullOrEmpty(user.UserName))
                {
                    claims.Add(new Claim(ClaimTypes.Name, user.UserName));
                }

                // Agrega más claims aquí si es necesario

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var authProperties = new AuthenticationProperties
                {
                    // Configura las propiedades de autenticación según tus necesidades
                };

                HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties).Wait();

                return RedirectToAction("Index", "Home");
            }

            ModelState.AddModelError(string.Empty, "Intento de inicio de sesión no válido");
        }

        return View();
    }

    [HttpGet]
    public IActionResult Register()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Register(User user)
    {
        if (ModelState.IsValid)
        {
            // Verifica si el correo electrónico ya está registrado
            var existingUser = _userService.GetUserByEmail(user.UserEmail);
            if (existingUser != null)
            {
                ModelState.AddModelError("UserEmail", "El correo electrónico ya está registrado.");
                return View(user);
            }

            // Crea un nuevo usuario basado en los datos proporcionados
            var newUser = new User
            {
                UserEmail = user.UserEmail,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Password = user.Password // Considera realizar un hash de la contraseña antes de almacenarla en la base de datos
            };

            // Agrega lógica para crear y almacenar al usuario en la base de datos
            _userService.AddUser(newUser); // Asume que tienes un método en _userService para crear usuarios

            // Una vez registrado, redirige al usuario a la página de inicio de sesión
            return RedirectToAction("Login");
        }

        return View(user);
    }

    
    // Otros métodos del controlador, como Register, ForgotPassword, Logout, etc.
    public IActionResult ForgotPassword()
    {
        throw new NotImplementedException();
    }
}