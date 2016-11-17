using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RetailDB;

namespace App.Web4.Models
{
    public class ReviewRepository 
    {
        private BrainsEntities _ctx;

        public ReviewRepository(BrainsEntities ctx)
        {
            _ctx = ctx;
        }

        public IQueryable<RetailReview> GetAll()
        {
            return _ctx.RetailReviews.AsQueryable();
        }

        
    }
}