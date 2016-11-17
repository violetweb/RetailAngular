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
using App.Web4.Models;

namespace App.Web4.Controllers
{
    public class CustomersSalesPersonsNewController : ApiController
    {

        private BrainsEntities db = new BrainsEntities();


        // POST: api/RetailPromos     
        [ResponseType(typeof(CustomersNew))]
        public IHttpActionResult PostCustomersSalesPersonsNew(CustomersNew data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Customers_SalesPersons_New(data.Customer_ID, data.Customer_Name, data.Street1, data.Street2!=null?data.Street2:"", data.City, data.Province, data.PostalCode.ToUpper(), data.Country, data.EMail!=null ? data.EMail : "", data.Phone!=null?data.Phone : "", data.Fax!=null?data.Fax:"", data.WebSite!=null?data.WebSite:"", data.Profession_ID!=null?data.Profession_ID:""); 
            return CreatedAtRoute("DefaultApi", new { id = data.Customer_ID }, data);
        }

      


    }
}
