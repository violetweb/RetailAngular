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
using Newtonsoft.Json;


namespace App.Web4.Controllers
{

   
    public class CustomerInfoController : ApiController
    {

        private BrainsEntities db = new BrainsEntities();


        // GET: api/CustomerInfoForCharts_Result
   
        public IQueryable<CustomerInfoForCharts_Result> GetCustomerInfo(string id, string Startdate, string Enddate)
        {

            DateTime starter = Convert.ToDateTime(Startdate.Replace(".","/"));
            DateTime ender = Convert.ToDateTime(Enddate.Replace(".", "/"));
            var results = db.CustomerInfoForCharts(id, starter, ender).AsEnumerable().ToList().AsQueryable();
            return results;
            
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