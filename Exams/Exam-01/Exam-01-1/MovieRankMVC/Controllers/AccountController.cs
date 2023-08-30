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
    public async Task<IActionResult> Login(string userEmail, string password, string returnUrl = null)
    {
        if (ModelState.IsValid)
        {
            var user = _userService.GetUserByEmail(userEmail);
            
            if (user != null && user.Password == password)
            {
                var claims = new List<Claim>();

                if (!string.IsNullOrWhiteSpace(user.UserName))
                {
                    claims.Add(new Claim(ClaimTypes.Name, user.UserName));
                }
                
                // Generar un identificador único para el usuario
                var userId = Guid.NewGuid().ToString();
                claims.Add(new Claim("UserId", userId)); // Agregar el Claim personalizado

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var authProperties = new AuthenticationProperties
                {
                    // Configure authentication properties as needed
                };

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);

                return RedirectToAction("Index", "Home");
            }

            ModelState.AddModelError(string.Empty, "Invalid login attempt");
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