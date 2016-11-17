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
    public class CustomerOrderReturnsController : ApiController
    {

        private BrainsEntities db = new BrainsEntities();

           public IQueryable<Customer_OrderReturns_Result1> GetCustomerOrderReturns(string id, string Term)
        {

            var term = Convert.ToInt16(Term);
            var results = db.Customer_OrderReturns(id, term).AsEnumerable().ToList().AsQueryable();
            return results;

        }


    }
}
