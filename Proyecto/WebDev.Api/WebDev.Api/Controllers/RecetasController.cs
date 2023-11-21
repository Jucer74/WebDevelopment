using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebDev.Api.Context;
using WebDev.Api.Model;

namespace WebDev.Api.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecetasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RecetasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Receta>>> GetRecetas()
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            return await _context.Recetas.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Receta>> GetRecetas(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var receta = await _context.Recetas.FindAsync(id);

            if (receta == null)
            {
                return NotFound();
            }

            return receta;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReceta(int id, Receta receta)
        {
            if (id != receta.id)
            {
                return BadRequest();
            }

            _context.Entry(receta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecetasExists(id))
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
        public async Task<ActionResult<Receta>> PostUser(Receta receta)
        {
            if (_context.Recetas == null)
            {
                return Problem("Entity set 'AppDbContext.Users'  is null.");
            }
            _context.Recetas.Add(receta);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetUser", new { id = user.Id }, user);
            return Created(string.Empty, new { id = receta.id });
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReceta(int id)
        {
            if (_context.Recetas == null)
            {
                return NotFound();
            }
            var receta = await _context.Recetas.FindAsync(id);
            if (receta == null)
            {
                return NotFound();
            }

            _context.Recetas.Remove(receta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecetasExists(int id)
        {
            return (_context.Recetas?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
