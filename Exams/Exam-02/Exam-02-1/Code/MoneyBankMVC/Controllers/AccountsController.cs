using Microsoft.AspNetCore.Mvc;
using MoneyBankMVC.Models;
using MoneyBankMVC.Services;

[Route("api/[controller]")]
[ApiController]
public class AccountsController : ControllerBase
{
    private readonly IAccountService _accountService;

    public AccountsController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Account>>> GetAccounts()
    {
        var accounts = await _accountService.ListarCuentas();
        return Ok(accounts);
    }

    [HttpPost]
    public async Task<IActionResult> CrearCuenta(Account cuenta)
    {
        try
        {
            await _accountService.CrearCuenta(cuenta);
            return CreatedAtAction(nameof(GetAccounts), new { id = cuenta.Id }, cuenta);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditarCuenta(int id, Account cuenta)
    {
        try
        {
            await _accountService.EditarCuenta(id, cuenta);
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("deposit/{id}")]
    public async Task<IActionResult> Depositar(int id, decimal monto)
    {
        try
        {
            await _accountService.Depositar(id, monto);
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("withdraw/{id}")]
    public async Task<IActionResult> Retirar(int id, decimal monto)
    {
        try
        {
            await _accountService.Retirar(id, monto);
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Account>> ObtenerInformacion(int id)
    {
        try
        {
            var account = await _accountService.ObtenerInformacion(id);
            return Ok(account);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> EliminarCuenta(int id)
    {
        try
        {
            await _accountService.EliminarCuenta(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
