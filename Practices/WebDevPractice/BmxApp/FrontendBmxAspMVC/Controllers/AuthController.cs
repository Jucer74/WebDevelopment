using System.Security.Claims;
using FrontendBmxAspMVC.Dtos;
using FrontendBmxAspMVC.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FrontendBmxAspMVC.Controllers;

public class AuthController : Controller
{
    // Vars
    private readonly IAuthService _authService;

    // Constructor
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    // Methods
    // GET: /Auth/Login
    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }

    // POST: /Auth/Login[HttpPost]
    public async Task<IActionResult> Login(AuthDto authDto)
    {
        // Authenticate the user
        var response = await _authService.Auth(authDto);

        // Deserialize the response to a dynamic object
        dynamic responseToke = JsonConvert.DeserializeObject(response?.ToString() ?? string.Empty)!;

        // Get the token from the response
        var token = responseToke.token?.ToString();

        // Check if the token is null or empty
        if (string.IsNullOrEmpty(token))
        {
            // Return the view with an error message
            return View("Login");
        }

        // Create claims for the user
        var claims = new[]
        {
            new Claim("AccessToken", token)
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        // Sign in the user
        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(identity));

        // Redirect to the home page
        return RedirectToAction("Index", "Home");
    }

    // GET: /Auth/Register
    [HttpGet]
    public IActionResult Register()
    {
        return View();
    }

    // POST: /Auth/Register
    [HttpPost]
    public async Task<IActionResult> Register(RegisterDto registerDto)
    {
        // Register the user
        var user = await _authService.Register(registerDto);

        // Check if the user is null
        if (user == null)
        {
            // Return the view with an error message
            ModelState.AddModelError(string.Empty, "Registration failed");
            return View("Register");
        }

        // Redirect to the login page
        return RedirectToAction("Login");
    }
}