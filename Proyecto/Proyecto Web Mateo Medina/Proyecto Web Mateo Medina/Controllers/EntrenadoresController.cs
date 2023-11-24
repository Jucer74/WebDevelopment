using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Proyecto_Web_Mateo_Medina.Models;

namespace Proyecto_Web_Mateo_Medina.Controllers
{
    public class EntrenadoresController : Controller
    {
        private static List<EntrenadorModel> listaEntrenadores = new List<EntrenadorModel>
    {
        new EntrenadorModel { FirstName = "Juan", LastName = "Pérez" },
        new EntrenadorModel { FirstName = "María", LastName = "Gómez" },
        // Puedes agregar más entrenadores aquí...
    };
        // GET: EntrenadoresController
        public ActionResult Index()
        {
            return View();
        }

        // GET: EntrenadoresController/Details/5
        public ActionResult Detalles(int id)
        {
            var entrenador = listaEntrenadores.ElementAtOrDefault(id);
            return View(entrenador);
        }

        // GET: EntrenadoresController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: EntrenadoresController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(EntrenadorModel nuevoEntrenador)
        {
            // Aquí puedes realizar la validación de los datos del nuevo entrenador, por ejemplo:
            if (ModelState.IsValid)
            {
                // Agregar el nuevo entrenador a la lista
                listaEntrenadores.Add(nuevoEntrenador);

                // Redirigir de vuelta a la lista de entrenadores después de agregarlo
                return RedirectToAction("ListaEntrenadores");
            }

            // Si la validación falla, vuelve a mostrar el formulario de creación con los errores
            return View(nuevoEntrenador);
        }

        // GET: EntrenadoresController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: EntrenadoresController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: EntrenadoresController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: EntrenadoresController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
        // Acción para mostrar la lista de entrenadores disponibles
        // Acción para mostrar la lista de entrenadores
        public ActionResult ListaEntrenadores()
        {
            return View(listaEntrenadores);
        }

    }
}
