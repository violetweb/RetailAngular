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


    public class CustomerSpecPricingSalesController : ApiController
    {

        private BrainsEntities db = new BrainsEntities();


        // GET: api/CustomerInfoForCharts_Result
        public IQueryable<CustomerSpecPricingSales_Result> GetCustomerSpecPricingSales(string id)
        {
            var results = db.CustomerSpecPricingSales(id).AsEnumerable().ToList().AsQueryable();
            return results;

        }


    
    }
}