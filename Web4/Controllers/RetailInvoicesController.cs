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
    public class RetailInvoicesController : ApiController
    {
        private BrainsEntities db = new BrainsEntities();

        

        // GET: api/Retail_GetInvoiceListByLinkID_Result
        //GRABS THE LIST BASED Grouped by LINKID, utilizes the Stored Procedure to LIST.
        public IQueryable<Retail_GetInvoiceListByLinkID_Result2> GetRetailInvoices()
        {
           return db.Retail_GetInvoiceListByLinkID().AsEnumerable().ToList().AsQueryable();
         
           
        }

        // GET: api/RetailInvoices/5
        // USES THE DIRECT ACCESS TO THE TABLE, [RETAIL_INVOICES].
        [ResponseType(typeof(RetailInvoice))]
        public IHttpActionResult GetRetailInvoices(int id)
        {
            Retail_Invoices retailInvoice = db.Retail_Invoices.Find(id);
            if (retailInvoice == null)
            {
                return NotFound();
            }

            return Ok(retailInvoice);
        }

        // PUT: api/RetailInvoices/5      
        [ResponseType(typeof(void))]       
        public IHttpActionResult PutRetailInvoices(int id, Retail_Invoices retailInvoice)
        {
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != retailInvoice.Invoice_Number)
            {
                return BadRequest();
            }


            db.Entry(retailInvoice).State = System.Data.Entity.EntityState.Modified;

            //date issue :SqlDateTime overflow. Must be between 1/1/1753 12:00:00 AM and 12/31/9999 11:59:59 PM.
            try
            {
                db.SaveChanges();
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!RetailInvoiceExists(id))
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


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RetailInvoiceExists(int id)
        {
            return db.Retail_Invoices.Count(e => e.Invoice_Number == id) > 0;
        }
      
    }


}
