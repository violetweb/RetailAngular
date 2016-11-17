using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace App.Web4.Models
{


    public class RetailLenses
    {
        public string Item_ID { get; set; }
        public string URLName  { get; set; }
        public string ProductName { get; set; }
        public string Root_Folder { get; set; }
        public string File_Name { get; set; }
        public string ImageSrc {get;set;}
        public decimal Price { get; set; }
        public decimal Price_As_Low_As { get; set; }
        public string UoM_Name { get; set; }
        
    }
}