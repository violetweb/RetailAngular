using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Web4.Models
{
    public class Promo
    {
       
       public string Promotion_ID { get; set; }
       public string Customer_ID { get; set; }
       public DateTime Start_Date { get; set; }
       public DateTime End_Date { get; set; }
       public int Min_Qty { get; set; }
       public Double Price { get; set; }
       public bool Percentage { get; set; }
       public string Comments { get; set; }
       public string Comments_fr { get; set; }
      
    }
}