using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebDev.Application.Config;
using WebDev.Application.Models;
using WebDev.Services;
using WebDev.Services.Entities;

namespace WebDev.Application.Controllers
{
    public class LibrosController : Controller
    {
        private readonly ApiConfiguration _apiConfiguration;
        private LibrosService librosService;

        public LibrosController(IOptions<ApiConfiguration> apiConfiguration)
        {
            _apiConfiguration = apiConfiguration.Value;
            librosService = new LibrosService(_apiConfiguration.ApiLibrosUrl);
        }

        // GET: LibrosController
        [HttpGet]
        public async Task<ActionResult> Index()
        {
            IList<LibroDto> libros = await librosService.GetLibros();

            return View(libros.Select(libroDto => MapperToLibro(libroDto)).ToList());
        }

        // GET: LibrosController/Details/5
        [HttpGet]
        public async Task<ActionResult> Details(int id)
        {
            var libroFound = await librosService.GetLibroById(id);

            if (libroFound == null)
            {
                return NotFound();
            }

            return View(MapperToLibro(libroFound));
        }

        // GET: LibrosController/Create
        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        // POST: LibrosController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(Libro libro)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var libroDto = MapperToLibroDto(libro);
                    await librosService.AddLibro(libroDto);
                    return RedirectToAction(nameof(Index));
                }
                return View();
            }
            catch
            {
                return View();
            }
        }

        // GET: LibrosController/Edit/5
        [HttpGet]
        public async Task<ActionResult> Edit(int id)
        {
            var libroFound = await librosService.GetLibroById(id);

            if (libroFound == null)
            {
                return NotFound();
            }

            return View(MapperToLibro(libroFound));
        }

        // POST: LibrosController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(Libro libro)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var libroDto = MapperToLibroDto(libro);
                    await librosService.UpdateLibro(libroDto);
                    return RedirectToAction(nameof(Index));
                }
                return View(libro);
            }
            catch
            {
                return View();
            }
        }

        // GET: LibrosController/Delete/5
        [HttpGet]
        public async Task<ActionResult> Delete(int id)
        {
            var libroFound = await librosService.GetLibroById(id);

            if (libroFound == null)
            {
                return NotFound();
            }

            return View(MapperToLibro(libroFound));
        }

        // POST: LibrosController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Delete(Libro libro)
        {
            try
            {
                var libroFound = await librosService.GetLibroById(libro.Id);

                if (libroFound == null)
                {
                    return View();
                }

                await librosService.DeleteLibro(libro.Id);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        private Libro MapperToLibro(LibroDto libroDto)
        {
            return new Libro
            {
                Id = libroDto.Id,
                Titulo = libroDto.Titulo,
                Autor = libroDto.Autor,
                Precio = libroDto.Precio,
                Cantidad = libroDto.Cantidad,
                Imagen = libroDto.Imagen
            };
        }

        private LibroDto MapperToLibroDto(Libro libro)
        {
            return LibroDto.Build(
                id: libro.Id,
                titulo: libro.Titulo,
                autor: libro.Autor,
                precio: libro.Precio,
                cantidad: libro.Cantidad,
                imagen: libro.Imagen
            );
        }
    }
}
