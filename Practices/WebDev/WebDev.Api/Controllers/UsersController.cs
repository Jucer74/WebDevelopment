using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebDev.Api.Context;
using WebDev.Api.Model;

namespace WebDev.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class citasmedicasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public citasmedicasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/citasmedicas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<citasmedicas>>> Getcitasmedicas()
        {
            return await _context.citasmedicas.ToListAsync();
        }

        // GET: api/citasmedicas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<citasmedicas>> Getcitasmedicas(int id)
        {
            var citasmedicas = await _context.citasmedicas.FindAsync(id);

            if (citasmedicas == null)
            {
                return NotFound();
            }

            return citasmedicas;
        }

        // PUT: api/citasmedicas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Putcitasmedicas(int id, citasmedicas citasmedicas)
        {
            if (id != citasmedicas.Id)
            {
                return BadRequest();
            }

            _context.Entry(citasmedicas).State = EntityState.Modified;

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

        // POST: api/citasmedicas
        [HttpPost]
        public async Task<ActionResult<citasmedicas>> Postcitasmedicas(citasmedicas citasmedicas
            )
        {
            _context.citasmedicas.Add(citasmedicas);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id =citasmedicas.Id }, citasmedicas);
        }

        // DELETE: api/citasmedicas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletecitasmedicas(int id)
        {
            var citasmedicas = await _context.citasmedicas.FindAsync(id);
            if (citasmedicas == null)
            {
                return NotFound();
            }

            _context.citasmedicas.Remove(citasmedicas);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.citasmedicas.Any(e => e.Id == id);
        }
    }
}
