using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Web4.Models
{
    public class Scheduler
    {

        public int ID { get; set; }
        public int UserID { get; set; }
        public string Customer_ID { get; set; }
        public string Title { get; set; }
        public System.DateTime Start_Time { get; set; }
        public System.DateTime End_Time { get; set; }
    }
}