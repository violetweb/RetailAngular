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
    
 
    public class RetailReviewsController : ApiController
    {
       

        RetailDB.BrainsEntities db = new BrainsEntities();

       
        // GET: api/RetailReviews
        public IQueryable<RetailReview> GetRetailReviews()
        {
        
            return db.RetailReviews;
      
            
        }


        // GET: api/RetailReviews/5
        [ResponseType(typeof(RetailReview))]
        public IHttpActionResult GetRetailReview(int id)
        {
            RetailReview retailReview = db.RetailReviews.Find(id);
            if (retailReview == null)
            {
                return NotFound();
            }

            return Ok(retailReview);
        }

        // PUT: api/RetailReviews/5      
        [ResponseType(typeof(void))]      
        public IHttpActionResult PutRetailReview(int id, RetailReview retailReview)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != retailReview.ID)
            {
                return BadRequest();
            }

            db.Entry(retailReview).State = System.Data.Entity.EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RetailReviewExists(id))
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

        // POST: api/RetailReviews     
        [ResponseType(typeof(Review))]
        public IHttpActionResult PostRetailReview(RetailReview retailReview)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RetailReviews.Add(retailReview);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = retailReview.ID }, retailReview);
        }

        // DELETE: api/RetailReviews/5    
        [ResponseType(typeof(RetailReview))]
        public IHttpActionResult DeleteRetailReview(int id)
        {
            RetailReview retailReview = db.RetailReviews.Find(id);
            if (retailReview == null)
            {
                return NotFound();
            }

            db.RetailReviews.Remove(retailReview);
            db.SaveChanges();

            return Ok(retailReview);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RetailReviewExists(int id)
        {
            return db.RetailReviews.Count(e => e.ID == id) > 0;
        }
      
    }
       
}