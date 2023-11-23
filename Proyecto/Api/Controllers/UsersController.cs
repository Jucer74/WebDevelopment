using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Context;
using Api.Models;
using Api.Dto;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
          var user = await _context.Users.Include(u => u.Agents).ToListAsync();
       
          if (user == null || !user.Any())
          {
              return NotFound();
          }
            var userDtos = user.Select(user => new UserDto
            {
                Id = user.Id,
                UserEmail = user.UserEmail,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Password = user.Password,
                Role = user.Role,
                Agents = user.Agents.Select(Agent => new AgentDto
                {
                    Id = Agent.Id,
                    AgentName = Agent.AgentName
                }).ToList()
            }).ToList();
            return userDtos;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _context.Users
                .AsNoTracking()
                .Include(u => u.Agents)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
              return NotFound();
            }

            var userDto = new UserDto
            {
                Id = user.Id,
                UserEmail = user.UserEmail,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Password = user.Password,
                Role = user.Role,
                Agents = user.Agents.Select(Agent => new AgentDto
                {
                    Id = Agent.Id,
                    AgentName = Agent.AgentName
                }).ToList()
            };


            return userDto;
        }

        [HttpGet("{id}/Agents")]
        public async Task<ActionResult<IEnumerable<Agent>>> GetProductsByUserId(int id)
        {
            var userAgents = await _context.Users
                .Where(u => u.Id == id)
                .SelectMany(u => u.Agents)
                .ToListAsync();

            if (userAgents == null || !userAgents.Any())
            {
                return NotFound("No se encontraron productos para este usuario");
            }

            return Ok(userAgents);
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
              return Problem("Entity set 'AppDbContext.Users'  is null.");
          }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }


        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{userId}/AddAgent")]
        public async Task<IActionResult> AddProductToUser(int userId, [FromBody] Agent Agent)
        {
            var user = await _context.Users.Include(u => u.Agents).FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound("Usuario no encontrado");
            }

            // Verifica si el producto ya está asociado al usuario
            var existingProduct = user.Agents.FirstOrDefault(p => p.Id == Agent.Id);
            if (existingProduct != null)
            {
                return BadRequest("El producto ya está asociado al usuario");
            }

            // Agrega el producto al usuario y guarda los cambios
            user.Agents.Add(Agent);
            await _context.SaveChangesAsync();

            return Ok("Agente añadido al usuario correctamente");
        }

        [HttpDelete("{userId}/RemoveAgent/{AgentId}")]
        public async Task<IActionResult> RemoveProductFromUser(int userId, int productId)
        {
            var user = await _context.Users.Include(u => u.Agents).FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound("Usuario no encontrado");
            }

            // Busca el producto en la lista de productos del usuario
            var productToRemove = user.Agents.FirstOrDefault(p => p.Id == productId);
            if (productToRemove == null)
            {
                return NotFound("El producto no está asociado al usuario");
            }

            // Remueve el producto del usuario y guarda los cambios
            user.Agents.Remove(productToRemove);
            await _context.SaveChangesAsync();

            return Ok("Producto removido del usuario correctamente");
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
