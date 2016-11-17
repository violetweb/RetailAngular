using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using RetailDB;  
using App.Web4.Models;


namespace App.Web4.Controllers
{

   
    public class RetailLensesController : ApiController
    {

        
        private BrainsEntities db = new BrainsEntities();

        // GET: api/RetailLenses
        public IQueryable<Retail_FillContactLensesGrid_Result> GetRetailLenses()        {
            
           
            return db.Retail_FillContactLensesGrid("OPTIK CND", "EN", "", "", "").AsEnumerable().ToList().AsQueryable();       
        }


        [ResponseType(typeof(Retail_FillContactLensesGrid_Result))]
        public IHttpActionResult GetRetailLenses(string id)
        {


            var items = db.Retail_FillContactLensesGrid("OPTIK CND", "EN", "", "", "").FirstOrDefault(x => x.Item_ID == id);
           
            if (items == null)
            {
               return NotFound();
            }

            return Ok(items);
        }

        
    }
}
