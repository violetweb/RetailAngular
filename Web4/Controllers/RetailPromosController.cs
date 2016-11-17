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
using RetailDB;
using App.Web4.Models;


namespace App.Web4.Controllers
{
    public class RetailPromosController : ApiController
    {
        
        RetailDB.BrainsEntities db = new BrainsEntities();

       
        // GET: api/RetailPromos
        public IQueryable<Retail_Promotions> GetRetailPromos()
        {
           return db.Retail_Promotions;
        }


        // GET: api/RetailPromos/5
        [ResponseType(typeof(Retail_Promotions))]
        public IHttpActionResult GetRetailPromo(string id)
        {
            
            

            Retail_Promotions retailPromo = db.Retail_Promotions.Find(id,1,"OPTIK CND");
            if (retailPromo == null)
            {
                return NotFound();
            }

            return Ok(retailPromo);
        }

        // PUT: api/RetailPromos/5      
        [ResponseType(typeof(void))]     
        public IHttpActionResult PutRetailReview(string id, Retail_Promotions retailPromo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != retailPromo.Promotion_ID)
            {
                return BadRequest();
            }

            db.Entry(retailPromo).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RetailPromoExists(id))
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

        // POST: api/RetailPromos     
        [ResponseType(typeof(Promo))]
        public IHttpActionResult PostRetailPromo(Retail_Promotions retailPromo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Retail_Promotions.Add(retailPromo);          
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = retailPromo.Promotion_ID }, retailPromo);
        }

        // DELETE: api/RetailPromos/5       
        [ResponseType(typeof(Promo))]
        public IHttpActionResult DeleteRetailPromo(string id)
        {
            Retail_Promotions retailPromo = db.Retail_Promotions.Find(id);
            if (retailPromo == null)
            {
                return NotFound();
            }

            db.Retail_Promotions.Remove(retailPromo);
            db.SaveChanges();

            return Ok(retailPromo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RetailPromoExists(string id)
        {
            return db.Retail_Promotions.Count(e => e.Promotion_ID == id) > 0;
        }
      
    }
 
}