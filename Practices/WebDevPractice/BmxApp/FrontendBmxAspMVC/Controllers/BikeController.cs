using FrontendBmxAspMVC.Interfaces;
using FrontendBmxAspMVC.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FrontendBmxAspMVC.Controllers;

[Authorize]
public class BikeController : Controller
{
    // Vars
    private readonly IBikeService _bikeService;

    // Constructor
    public BikeController(IBikeService bikeService)
    {
        _bikeService = bikeService;
    }

    // Methods
    // GET: Bike
    public async Task<IActionResult> Index()
    {
        var bikes = await _bikeService.GetAllBikesAsync();
        return View(bikes);
    }

    // GET: Bike/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: Bike/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Bike bike)
    {
        try
        {
            await _bikeService.CreateBikeAsync(bike);
            return RedirectToAction(nameof(Index));
        }
        catch
        {
            return View();
        }
    }

    // GET: Bike/Edit/5
    public async Task<IActionResult> Edit(int id)
    {
        try
        {
            var bike = await _bikeService.GetBikeByIdAsync(id);
            return View(bike);
        }
        catch
        {
            return View();
        }
    }

    // PUT: Bike/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, Bike? bike)
    {
        try
        {
            if (bike != null) await _bikeService.UpdateBikeAsync(id, bike);
            return RedirectToAction(nameof(Index));
        }
        catch
        {
            return View();
        }
    }

    // GET: Bike/Details/5
    public async Task<IActionResult> Details(int id)
    {
        try
        {
            var bike = await _bikeService.GetBikeByIdAsync(id);
            return View(bike);
        }
        catch
        {
            return View();
        }
    }

    // GET: Bike/Delete/5
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var bike = await _bikeService.GetBikeByIdAsync(id);
            return View(bike);
        }
        catch
        {
            return View();
        }
    }

    // DELETE: Bike/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(Bike bike)
    {
        try
        {
            await _bikeService.DeleteBikeAsync(bike.Id);
            return RedirectToAction(nameof(Index));
        }
        catch
        {
            return View();
        }
    }
}