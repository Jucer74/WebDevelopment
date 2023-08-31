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
        // GET: PersonasController/Edit/5


        // POST: PersonasController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Persona personaEditada)
        {
            try
            {
                var personaExistente = personasList.FirstOrDefault(p => p.Id == id);

                if (personaExistente != null && ModelState.IsValid)
                {
                    // Actualizar los campos de la persona existente con los valores editados
                    personaExistente.PhotoPath = personaEditada.PhotoPath;
                    personaExistente.UserEmail = personaEditada.UserEmail;
                    personaExistente.FirstName = personaEditada.FirstName;
                    personaExistente.LastName = personaEditada.LastName;
                    personaExistente.DateOfBirth = personaEditada.DateOfBirth;
                    personaExistente.Sex = personaEditada.Sex;
                    personaExistente.Password = personaEditada.Password;
                    personaExistente.ConfirmPassword = personaEditada.ConfirmPassword;

                    return RedirectToAction(nameof(Index));
                }

                return View(personaEditada);
            }
            catch
            {
                return View();
            }
        }



        // GET: MoviesController/Delete/5
        public ActionResult Delete(int id)
        {
            var persona = personasList.FirstOrDefault(x => x.Id == id);
            return View(persona);
        }

        // POST: PersonasController/DeleteConfirmed/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            var personaToDelete = personasList.FirstOrDefault(x => x.Id == id);
            _ = personasList.Remove(personaToDelete);

            // Reenumerar los IDs para mantener el orden
            for (int i = 0; i < personasList.Count; i++)
            {
                personasList[i].Id = i + 1;
            }

            return RedirectToAction(nameof(Index));
        }







        public static List<Persona> LoadPersonas()
        {
            var personas = new List<Persona>();

            personas.Add(new Persona()
            {
                Id = 1, PhotoPath = "ruta_de_la_foto_tatiana.jpg", UserEmail = "correo1@example.com", FirstName = "Juan", LastName = "Rome", Password = "contraseña123", ConfirmPassword = "contraseña123", DateOfBirth = new DateTime(1974, 10, 8), Sex = 'M' });

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

            personas.Add(new Persona()
            {
                Id = 5,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 6,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 7,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 8,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 9,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 10,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 11,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 12,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 13,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 14,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 15,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 16,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 17,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 18,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 19,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 20,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 21,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 22,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });
            personas.Add(new Persona()
            {
                Id = 23,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 24,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 25,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 26,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 27,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 28,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 29,
                PhotoPath = "ruta_de_la_foto_otrojuan.jpg",
                UserEmail = "correo4@example.com",
                FirstName = "Juan",
                LastName = "Rome",
                Password = "otracontraseña",
                ConfirmPassword = "otracontraseña",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'M'
            });

            personas.Add(new Persona()
            {
                Id = 30,
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
