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
    public class CustomerSalesPersonGlobalSearchController : ApiController
    {

        private BrainsEntities db = new BrainsEntities();


        // GET: api/Retail_GetInvoiceListByLinkID_Result
        public IQueryable<Customer_SalesPerson_GlobalSearch_Result> GetCustomerSalesPersonGlobalSearch(string id)
        {
               return db.Customer_SalesPerson_GlobalSearch(id).AsEnumerable().ToList().AsQueryable();
          

        }
    }
}
