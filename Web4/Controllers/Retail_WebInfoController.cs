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
    public class Retail_WebInfoController : ApiController
    {
        private BrainsEntities db = new BrainsEntities();

        // GET: api/Retail_WebInfo
        public IQueryable<Retail_WebInfo> GetRetail_WebInfo()
        {
            return db.Retail_WebInfo;
        }

        // GET: api/Retail_WebInfo/5
        [ResponseType(typeof(Retail_WebInfo))]
        public async Task<IHttpActionResult> GetRetail_WebInfo(int id)
        {
            Retail_WebInfo retail_WebInfo = await db.Retail_WebInfo.FindAsync(id);
            if (retail_WebInfo == null)
            {
                return NotFound();
            }

            return Ok(retail_WebInfo);
        }

        // PUT: api/Retail_WebInfo/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutRetail_WebInfo(int id, Retail_WebInfo retail_WebInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != retail_WebInfo.ID)
            {
                return BadRequest();
            }

            db.Entry(retail_WebInfo).State = System.Data.Entity.EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Retail_WebInfoExists(id))
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

        // POST: api/Retail_WebInfo
        [ResponseType(typeof(Retail_WebInfo))]
        public async Task<IHttpActionResult> PostRetail_WebInfo(Retail_WebInfo retail_WebInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Retail_WebInfo.Add(retail_WebInfo);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = retail_WebInfo.ID }, retail_WebInfo);
        }

        // DELETE: api/Retail_WebInfo/5
        [ResponseType(typeof(Retail_WebInfo))]
        public async Task<IHttpActionResult> DeleteRetail_WebInfo(int id)
        {
            Retail_WebInfo retail_WebInfo = await db.Retail_WebInfo.FindAsync(id);
            if (retail_WebInfo == null)
            {
                return NotFound();
            }

            db.Retail_WebInfo.Remove(retail_WebInfo);
            await db.SaveChangesAsync();

            return Ok(retail_WebInfo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Retail_WebInfoExists(int id)
        {
            return db.Retail_WebInfo.Count(e => e.ID == id) > 0;
        }
    }
}