using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using webapiprueba.Models;

namespace webapiprueba.Controllers
{
    public class peopleController : ApiController
    {
        private CrudMvcApiEntities db = new CrudMvcApiEntities();

        // GET: api/people
        public IQueryable<people> Getpeople()
        {
            return db.people;
        }

        // GET: api/people/5
        [ResponseType(typeof(people))]
        public IHttpActionResult Getpeople(int id)
        {
            people people = db.people.Find(id);
            if (people == null)
            {
                return NotFound();
            }

            return Ok(people);
        }

        // PUT: api/people/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putpeople(int id, people people)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != people.Id)
            {
                return BadRequest();
            }

            db.Entry(people).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!peopleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/people
        [ResponseType(typeof(people))]
        public IHttpActionResult Postpeople(people people)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.people.Add(people);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = people.Id }, people);
        }

        // DELETE: api/people/5
        [ResponseType(typeof(people))]
        public IHttpActionResult Deletepeople(int id)
        {
            people people = db.people.Find(id);
            if (people == null)
            {
                return NotFound();
            }

            db.people.Remove(people);
            db.SaveChanges();

            return Ok(people);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool peopleExists(int id)
        {
            return db.people.Count(e => e.Id == id) > 0;
        }
    }
}