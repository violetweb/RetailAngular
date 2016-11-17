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
    public class RetailSalesController : ApiController
    {


        private BrainsEntities db = new BrainsEntities();



        // GET: api/Retail_GetInvoiceListByLinkID_Result
        public IQueryable<Retail_SalesByECPCode_Result> GetRetailSales(string customerid, int sid)
        {
            return db.Retail_SalesByECPCode(customerid, sid).AsEnumerable().ToList().AsQueryable();


        }




    }
}