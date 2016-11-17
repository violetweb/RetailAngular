using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Web4.Models
{
    public interface IReviewRepository
    {
        IQueryable<Review> GetReviews();
        Review Get(int Id);        
        bool Insert(Review review);
        bool Update(Review review);        
        bool SaveAll();
    }
}