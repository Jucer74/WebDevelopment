using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CitasMedicasApi.Models;

namespace CitasMedicasApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EspecializacionsController : ControllerBase
    {
        private readonly CitasMedicasBdContext _context;

        public EspecializacionsController(CitasMedicasBdContext context)
        {
            _context = context;
        }

        // GET: api/Especializacions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Especializacion>>> GetEspecializacions()
        {
          if (_context.Especializacions == null)
          {
              return NotFound();
          }
            return await _context.Especializacions.ToListAsync();
        }

        // GET: api/Especializacions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Especializacion>> GetEspecializacion(int id)
        {
          if (_context.Especializacions == null)
          {
              return NotFound();
          }
            var especializacion = await _context.Especializacions.FindAsync(id);

            if (especializacion == null)
            {
                return NotFound();
            }

            return especializacion;
        }

        // PUT: api/Especializacions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEspecializacion(int id, Especializacion especializacion)
        {
            if (id != especializacion.Id)
            {
                return BadRequest();
            }

            _context.Entry(especializacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EspecializacionExists(id))
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

        // POST: api/Especializacions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Especializacion>> PostEspecializacion(Especializacion especializacion)
        {
          if (_context.Especializacions == null)
          {
              return Problem("Entity set 'CitasMedicasBdContext.Especializacions'  is null.");
          }
            _context.Especializacions.Add(especializacion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEspecializacion", new { id = especializacion.Id }, especializacion);
        }

        // DELETE: api/Especializacions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEspecializacion(int id)
        {
            if (_context.Especializacions == null)
            {
                return NotFound();
            }
            var especializacion = await _context.Especializacions.FindAsync(id);
            if (especializacion == null)
            {
                return NotFound();
            }

            _context.Especializacions.Remove(especializacion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EspecializacionExists(int id)
        {
            return (_context.Especializacions?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
