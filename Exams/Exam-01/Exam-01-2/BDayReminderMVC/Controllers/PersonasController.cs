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

        // GET: PersonasController/Delete/5
        public ActionResult Delete(int id)
        {
            var persona = personasList.FirstOrDefault(x => x.Id == id);
            return View(persona);
        }

        // POST: PersonasController/Delete/5
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


        private static List<Persona> LoadPersonas()
        {
            var personas = new List<Persona>();

            personas.Add(new Persona() { Id = 1, FirstName = "Juan", LastName = "Rome", DateOfBirth=new DateTime(1974, 10, 8), Sex= 'M' });
            personas.Add(new Persona() { Id = 2, FirstName = "Maria", LastName = "Rome", DateOfBirth = new DateTime(1974, 10, 8), Sex = 'F' });
            personas.Add(new Persona() { Id = 3, FirstName = "Tatiana", LastName = "Rome", DateOfBirth = new DateTime(1974, 10, 8), Sex = 'F' });
            personas.Add(new Persona() { Id = 4, FirstName = "Juan", LastName = "Rome", DateOfBirth = new DateTime(1974, 10, 8), Sex = 'M' });
            
            return personas;
        }

        


    }
}
