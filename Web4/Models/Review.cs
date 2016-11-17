using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web; 

namespace App.Web4.Models
{

   
    public class Review
    {
        public int Id { get; set; }
        public string ItemID { get; set; }
        public string ReviewBy { get; set; }
        public int ReviewRating { get; set; }
        public string ReviewComments { get; set; }
        public string ReviewTitle { get; set; }
        public int Display { get; set; }
    } 
}