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


namespace App.Web4.Controllers
{
    public class CustomersNotBySalespersonController : ApiController
    {

        private BrainsEntities db = new BrainsEntities();

        // GET: api/CustomerInfoForCharts_Result
        [Route("api/CustomersNotBySalesperson/{id}")]
        public IQueryable<CustomersNotBySalesPerson_Result> GetCustomersNotBySalesperson(string id)
        {
            int sid = Convert.ToInt16(id);
            var results = db.CustomersNotBySalesPerson(sid).AsEnumerable().ToList().AsQueryable();           
            return results;

        }

    }
}
