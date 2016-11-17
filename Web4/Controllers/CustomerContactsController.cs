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
using App.Web4.Models;
using System.Web;
using System.Collections;

namespace App.Web4.Controllers
{
    public class CustomerContactsController : ApiController
    {

        private BrainsEntities db = new BrainsEntities();



        // GET: Grab the List of Contacts by Customer ID.
        public IQueryable<Customer_Contacts> GetCustomerContacts(string id)
        {

            var results = db.Customer_Contacts.Where(x=> x.Customer_ID == id).ToList().AsQueryable();
            return results;

        }
    
        


        //POST:  SAVE A NEW CONTACT TO THE TABLE.
        [ResponseType(typeof(Customer_Contacts))]
        public async Task<IHttpActionResult> PostCustomerContacts(Customer_Contacts rs)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Customer_Contacts.Add(rs);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = rs.Customer_ID }, rs);
        }


    }
}
