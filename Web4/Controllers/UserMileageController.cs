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
    public class UserMileageController : ApiController
    {

       private BrainsEntities db = new BrainsEntities();

        

        // POST: api/Users_Mileage
        [ResponseType(typeof(Users_Mileage))]
        public async Task<IHttpActionResult> PostUserMileage(Users_Mileage usermileage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users_Mileage.Add(usermileage);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = usermileage.id }, usermileage);
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Users_MileageExists(int id)
        {
            return db.Users_Mileage.Count(e => e.id == id) > 0;
        }

    }
}
