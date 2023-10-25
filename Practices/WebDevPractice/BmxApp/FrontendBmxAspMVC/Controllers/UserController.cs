using FrontendBmxAspMVC.Interfaces;
using FrontendBmxAspMVC.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FrontendBmxAspMVC.Controllers;

[Authorize]
public class UserController : Controller
{
    // Vars
    private readonly IUserService _userService;

    // Constructor
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    // Methods
    // GET: User
    public async Task<IActionResult> Index()
    {
        var users = await _userService.GetAllUsersAsync();
        return View(users);
    }

    // GET: User/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: User/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(User user)
    {
        try
        {
            await _userService.CreateUserAsync(user);
            return RedirectToAction(nameof(Index));
        }
        catch
        {
            return View();
        }
    }

    // GET: User/Edit/5
    public async Task<IActionResult> Edit(int id)
    {
        try
        {
            var user = await _userService.GetUserByIdAsync(id);
            return View(user);
        }
        catch
        {
            return View();
        }
    }

    //Put: User/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, User user)
    {
        try
        {
            await _userService.UpdateUserAsync(id, user);
            return RedirectToAction(nameof(Index));
        }
        catch
        {
            return View();
        }
    }

    // GET: User/Details/5
    public async Task<IActionResult> Details(int id)
    {
        try
        {
            var user = await _userService.GetUserByIdAsync(id);
            return View(user);
        }
        catch
        {
            return View();
        }
    }

    // GET: User/Delete/5
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var user = await _userService.GetUserByIdAsync(id);
            return View(user);
        }
        catch
        {
            return View();
        }
    }

    // DELETE: User/Delete/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(User user)
    {
        try
        {
            await _userService.DeleteUserAsync(user.Id);
            return RedirectToAction(nameof(Index));
        }
        catch
        {
            return View();
        }
    }
}