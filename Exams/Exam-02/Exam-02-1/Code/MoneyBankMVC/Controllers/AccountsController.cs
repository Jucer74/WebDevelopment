using Microsoft.AspNetCore.Mvc;
using MoneyBankMVC.Models;
using MoneyBankMVC.Services;

namespace MoneyBankMVC.Controllers
{
  public class AccountsController : Controller
{
    // Crear Servicio
    private readonly IAccountService _accountService; // Ajusta la interfaz de servicio si es necesario

    public AccountsController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    // GET: StudentsController
    public ActionResult Index()
    {
        var accountsList = _accountService.GetAll(); // Ajusta el método si es necesario
        return View(accountsList);
    }

    // GET: StudentsController/Details/5
    public ActionResult Details(int id)
    {
        var account = _accountService.GetById(id); // Ajusta el método si es necesario
        return View(account);
    }

    // GET: StudentsController/Create
    public ActionResult Create()
    {
        return View();
    }

    // POST: StudentsController/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public ActionResult Create(Account account)
    {
        try
        {
            _accountService.Create(account);
            return RedirectToAction(nameof(Index));
        }
        catch
        {
            return View();
        }
    }

    // GET: StudentsController/Edit/5
    public ActionResult Edit(int id)
    {
        var account = _accountService.GetById(id); // Ajusta el método si es necesario
        return View(account);
    }

    // POST: StudentsController/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public ActionResult Edit(int id, Account account)
    {
        try
        {
            _accountService.Update(id, account);
            return RedirectToAction(nameof(Index));
        }
        catch
        {
            return View();
        }
    }

    // GET: StudentsController/Delete/5
    public ActionResult Delete(int id)
    {
        var account = _accountService.GetById(id); // Ajusta el método si es necesario
        return View(account);
    }

    // POST: StudentsController/Delete/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public ActionResult Delete(int id, Account account)
    {
        try
        {
            _accountService.DeleteById(id);
            return RedirectToAction(nameof(Index));
        }
        catch
        {
            return View();
        }
    }
}
}
