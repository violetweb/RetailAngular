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
    public class Retail_WebPageController : ApiController
    {
        private BrainsEntities db = new BrainsEntities();

        // GET: api/Retail_WebInfo
        public IQueryable<Retail_WebPage> GetRetail_WebPage()
        {
            return db.Retail_WebPage;
        }

        // GET: api/Retail_WebInfo/5
        [ResponseType(typeof(Retail_WebPage))]
        public async Task<IHttpActionResult> GetRetail_WebPage(int id)
        {
            Retail_WebPage retail_WebPage = await db.Retail_WebPage.FindAsync(id);
            if (retail_WebPage == null)
            {
                return NotFound();
            }

            return Ok(retail_WebPage);
        }

        // PUT: api/Retail_WebInfo/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutRetail_WebPage(int id, Retail_WebPage retail_WebPage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != retail_WebPage.PageId)
            {
                return BadRequest();
            }

            db.Entry(retail_WebPage).State = System.Data.Entity.EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Retail_WebPageExists(id))
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
        [ResponseType(typeof(Retail_WebPage))]
        public async Task<IHttpActionResult> PostRetail_WebPage(Retail_WebPage retail_WebPage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Retail_WebPage.Add(retail_WebPage);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = retail_WebPage.PageId }, retail_WebPage);
        }

        // DELETE: api/Retail_WebInfo/5
        [ResponseType(typeof(Retail_WebPage))]
        public async Task<IHttpActionResult> DeleteRetail_WebPage(int id)
        {
            Retail_WebPage retail_WebPage = await db.Retail_WebPage.FindAsync(id);
            if (retail_WebPage == null)
            {
                return NotFound();
            }

            db.Retail_WebPage.Remove(retail_WebPage);
            await db.SaveChangesAsync();

            return Ok(retail_WebPage);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Retail_WebPageExists(int id)
        {
            return db.Retail_WebPage.Count(e => e.PageId == id) > 0;
        }
    }
}