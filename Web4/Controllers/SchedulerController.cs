using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using RetailDB;

namespace App.Web4.Controllers
{
    public class SchedulerController : ApiController
    {
        private BrainsEntities db = new BrainsEntities();

        // GET: api/Scheduler
        public IQueryable<Scheduler> GetSchedulers()
        {
            return db.Schedulers; //uses plural to indicate multis.
           
        }

        // GET: api/Sheduler/5
        
        [ResponseType(typeof(Scheduler))]
        public async Task<IHttpActionResult> GetScheduler(int id)
        {
            Scheduler rs = await db.Schedulers.FindAsync(id); // find one in many.
            if (rs == null)
            {
                return NotFound();
            }

            return Ok(rs);
        }


        [Route("api/GetSchedulerDraggable/{id}")]
        public IQueryable<Scheduler> GetSchedulerDraggable(int id)
        {

            var exists = db.Schedulers.Where(item => item.UserID == id).Where(item => item.Title == null).Where(item => item.Start_Time == null).Where(item => item.End_Time == null).ToList().AsQueryable();
            return exists;

        }
        [Route("api/GetSchedulerList/{id}")]
        public IQueryable<Scheduler> GetSchedulerList(int id)
        {
            var exists = db.Schedulers.Where(item => item.UserID == id).Where(item => item.Title != null).Where(item => item.Start_Time != null).Where(item => item.End_Time != null).ToList().AsQueryable();
            
            
            return exists;

        }


        [Route("api/GetSchedulerExists/{id}")]
        public IQueryable<Scheduler> GetSchedulerExists(string id)
        {

            var exists = db.Schedulers.Where(item => item.Customer_ID == id).Where(item => item.Title == null).Where(item => item.Start_Time == null).Where(item => item.End_Time == null).ToList().AsQueryable();
            return exists;
            
        }

        // PUT: api/Scheduler/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutScheduler(int id, Scheduler rs)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rs.ID)
            {
                return BadRequest();
            }

            db.Entry(rs).State = System.Data.Entity.EntityState.Modified;

            try
            {
               
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Scheduler(id))
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

        private bool Scheduler(int id)
        {
            throw new NotImplementedException();
        }

        // POST: api/Scheduler
        [ResponseType(typeof(Scheduler))]
        public async Task<IHttpActionResult> PostScheduler(Scheduler rs)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Schedulers.Add(rs);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = rs.ID }, rs);
        }

        // DELETE: api/RetailReviews/5    
        [HttpDelete]
        [ResponseType(typeof(Scheduler))]
        public IHttpActionResult DeleteScheduler(int id)
        {
           Scheduler rs = db.Schedulers.Find(id);
            if (rs == null)
            {
                return NotFound();
            }

            db.Schedulers.Remove(rs);
            db.SaveChanges();

            return Ok(rs);
        }

       

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SchedulerExists(int id)
        {
            return db.Schedulers.Count(e => e.ID == id) > 0;
        }
    }
}