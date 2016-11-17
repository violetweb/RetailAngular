using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RetailDB;
using App.Web4.Models;

namespace App.Web4.Controllers
{
    public class MileageReportController : ApiController
    {

        private BrainsEntities db = new BrainsEntities();

        // GET: api/Retail_GetInvoiceListByLinkID_Result
        public IQueryable<Sales_MileageSummary_Result> GetMileageReport(string id)
        {            
           var results = db.Sales_MileageSummary(Convert.ToInt32(id)).AsEnumerable().ToList().AsQueryable();
           return results;

        }


    }
}
