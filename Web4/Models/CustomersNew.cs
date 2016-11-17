using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace App.Web4.Models
{


    public class CustomersNew
    {
        public string Customer_ID { get; set; }
        public string Customer_Name { get; set; }
        public string Street1 { get; set; }
        public string Street2 { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string WebSite { get; set; }
        public string EMail { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Profession_ID { get; set; }
    }
}