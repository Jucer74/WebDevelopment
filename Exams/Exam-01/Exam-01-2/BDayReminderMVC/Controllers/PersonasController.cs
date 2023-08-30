using BDayReminderMVC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BDayReminderMVC.Controllers
{
    public class PersonasController : Controller
    {
        private static List<Persona> personasList=LoadPersonas();


        // GET: PersonasController
        public ActionResult Index()
        {
            return View(personasList);
        }

        // GET: PersonasController/Details/5
        public ActionResult Details(int id)
        {
            var persona = personasList.FirstOrDefault(x=> x.Id == id);
            return View(persona);
        }

        // GET: PersonasController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: PersonasController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Persona nuevaPersona)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    nuevaPersona.Id = personasList.Max(p => p.Id) + 1;
                    personasList.Add(nuevaPersona);
                    return RedirectToAction(nameof(Index));
                }
                return View(nuevaPersona);
            }
            catch
            {
                return View();
            }
        }

        // GET: PersonasController/Edit/5
        public ActionResult Edit(int id)
        {
            var persona = personasList.FirstOrDefault(x => x.Id == id);
            return View(persona);
        }

        // POST: PersonasController/Edit/5
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


        // GET: MoviesController/Delete/5
        public ActionResult Delete(int id)
        {
            var personas = personasList.FirstOrDefault(x => x.Id == id);
            return View(personas);
        }

        // POST: MoviesController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            var movieToDelete = personasList.FirstOrDefault(x => x.Id == id);
            personasList.Remove(movieToDelete);

            // Reenumerar los IDs para mantener el orden
            for (int i = 0; i < personasList.Count; i++)
            {
                personasList[i].Id = i + 1;
            }

            return RedirectToAction(nameof(Index));
        }







        private static List<Persona> LoadPersonas()
        {
            var personas = new List<Persona>();

            personas.Add(new Persona()
            {
                Id = 1,
                PhotoPath = "ruta_de_la_foto_juan.jpg",
                UserEmail = "correo1@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "contraseña123",
                ConfirmPassword = "contraseña123",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 2,
                PhotoPath = "ruta_de_la_foto_maria.jpg",
                UserEmail = "correo2@example.com",
                FirstName = "Maria",
                LastName = "Rome",
                Password = "contraseña456",
                ConfirmPassword = "contraseña456",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'F'
            });

            personas.Add(new Persona()
            {
                Id = 3,
                PhotoPath = "ruta_de_la_foto_tatiana.jpg",
                UserEmail = "correo3@example.com",
                FirstName = "Tatiana",
                LastName = "Rome",
                Password = "contraseña789",
                ConfirmPassword = "contraseña789",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'F'
            });

            personas.Add(new Persona()
            {
                Id = 4,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            return personas;
        }

    }
}
