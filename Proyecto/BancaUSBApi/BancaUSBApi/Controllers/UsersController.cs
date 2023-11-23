using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BancaUSBApi.Models;
using BancaUSBApi.Context;
using BancaUSBApi.Dto;

namespace BancaUSBApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly BancausbContext _context;

        public UsersController(BancausbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _context.Users.Include(u => u.Products).ToListAsync();

            if (users == null || !users.Any())
            {
                return NotFound();
            }

            return users;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users
                .AsNoTracking()
                .Include(u => u.Products)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("{id}/Products")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsByUserId(int id)
        {
            var userProducts = await _context.Users
                .Where(u => u.Id == id)
                .SelectMany(u => u.Products)
                .ToListAsync();

            if (userProducts == null || !userProducts.Any())
            {
                return NotFound("No se encontraron productos para este usuario");
            }

            return Ok(userProducts);
        }



        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
          if (_context.Users == null)
          {
              return Problem("Entity set 'BancausbContext.Users'  is null.");
          }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.Include(u => u.Products).FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            user.Products.Clear();
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            // Eliminar al usuario
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok("Usuario Borrado correctamente");
        }



        [HttpPost("{userId}/UpdateProducts")]
        public async Task<IActionResult> UpdateProducts(int userId, [FromBody] List<int> productIds)
        {
            var user = await _context.Users.Include(u => u.Products).FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound("Usuario no encontrado");
            }

            // Obtener los productos existentes en la base de datos
            var existingProducts = await _context.Products.Where(p => productIds.Contains(p.Id)).ToListAsync();

            // Verificar si todos los productos existen en la base de datos
            if (existingProducts.Count != productIds.Count)
            {
                return NotFound("Algunos productos no existen en la base de datos");
            }

            // Agregar los nuevos productos al usuario y eliminar los que no están en la lista
            var userProductIds = user.Products.Select(p => p.Id).ToList();

            foreach (var product in existingProducts)
            {
                if (!userProductIds.Contains(product.Id))
                {
                    user.Products.Add(product);
                }
            }

            var productsToRemove = user.Products.Where(p => !existingProducts.Any(ep => ep.Id == p.Id)).ToList();
            foreach (var productToRemove in productsToRemove)
            {
                user.Products.Remove(productToRemove);
            }

            await _context.SaveChangesAsync();

            return Ok("Productos añadidos al usuario correctamente");
        }



        [HttpDelete("{userId}/RemoveProduct/{productId}")]
        public async Task<IActionResult> RemoveProductFromUser(int userId, int productId)
        {
            var user = await _context.Users.Include(u => u.Products).FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound("Usuario no encontrado");
            }

            // Busca el producto en la lista de productos del usuario
            var productToRemove = user.Products.FirstOrDefault(p => p.Id == productId);
            if (productToRemove == null)
            {
                return NotFound("El producto no está asociado al usuario");
            }

            // Remueve el producto del usuario y guarda los cambios
            user.Products.Remove(productToRemove);
            await _context.SaveChangesAsync();

            return Ok("Producto removido del usuario correctamente");
        }


        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
