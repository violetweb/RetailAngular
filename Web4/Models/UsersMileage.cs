using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Web4.Models
{
    public class UsersMileage
    {

        public int id { get; set; }
        public int User_ID { get; set; }
        public string timestamp { get; set; }
        public string startingmileage { get; set; }
        public string endingmileage { get; set; }
        public string mileageresult { get; set; }
        public string clientid { get; set; }
    }
}