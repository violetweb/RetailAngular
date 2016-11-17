using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RetailDB;

namespace App.Web4.Models
{
    public class PromoRepository
    {
        private BrainsEntities _ctx;

        public PromoRepository(BrainsEntities ctx)
        {
            _ctx = ctx;
        }

        /*** NAME OF THE TABLE!!!!**/
        public IQueryable<Retail_Promotions> GetAll()
        {
            return _ctx.Retail_Promotions.AsQueryable();
        }


    }
}