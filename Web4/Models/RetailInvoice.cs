using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Web4.Models
{
    public class RetailInvoice
    {
      
        public int Invoice_Number { get; set; }        
        public DateTime Date { get; set; }
        public string Patient_ID { get; set; }        
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public string Street_Name { get; set; }
        public string Appt_Street { get; set; }
        public string City { get; set; }
        public string Province {get;set;}
        public string Country_code {get;set;}
        public string Postal_Code {get;set;}
        public string Shipping_Courier { get; set; }
        public string Tracking_Number { get; set; }    
        public string Order_ID {get;set;}
        public string Eye {get;set;}
        public string Color {get;set;}
        public string BaseCurve {get;set;}
        public string Diameter {get;set;}
        public string Sphere {get;set;}
        public string Axis {get;set;}
        public string Add {get;set;}
        public string Other {get;set;}
        public string Qty {get;set;}
        public string Item_ID {get;set;}
        public string Price {get;set;}
        public string Web_Name {get;set;}
        public string Double {get;set;}


    }
}