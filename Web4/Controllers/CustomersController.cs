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
using System.Web;

namespace App.Web4.Controllers
{
    public class CustomersController : ApiController
    {
        
        
        
        private BrainsEntities db = new BrainsEntities();


        // GET: api/Retail_GetInvoiceListByLinkID_Result
        public IQueryable<Retail_CustomerLocate_Result> GetCustomer(string id, string SearchBy)
        {
            if (SearchBy == "CustomerID")
            {
                return db.Retail_CustomerLocate(id, "", "",0).AsEnumerable().ToList().AsQueryable();
            }
            else if (SearchBy == "CustomerName")
            {
                return db.Retail_CustomerLocate("", HttpUtility.UrlDecode(id), "",0).AsEnumerable().ToList().AsQueryable();
            }
            else if (SearchBy == "CustomerPhone")
            {
                return db.Retail_CustomerLocate("", "", HttpUtility.UrlDecode(id),0).AsEnumerable().ToList().AsQueryable();
            }
            else if (SearchBy == "SalesPerson")
            {
                int sid = Convert.ToInt16(id);
                return db.Retail_CustomerLocate("", "", "", sid).AsEnumerable().ToList().AsQueryable();
            }
            else
            {
                return db.Retail_CustomerLocate("", "", "", 0).AsEnumerable().ToList().AsQueryable();
            }

        }


        public IQueryable<Retail_CustomerLocate_Result> GetCustomers()
        {
            return db.Retail_CustomerLocate("", "", "", 0).AsEnumerable().ToList().AsQueryable();

        }


     
      
        
        /*

        // GET: api/Customers/5
        [ResponseType(typeof(RetailDB.Customer))]
        public async Task<IHttpActionResult> GetCustomer(string id)
        {
           
            
            RetailDB.Customer customer = await db.Customers.FindAsync(id);
          

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }
        */
    }
}