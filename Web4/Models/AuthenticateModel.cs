using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace App.Web4.Models
{
    public class AuthenticateModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public bool Success { get; set; }
        public string RetailAccess { get; set; }
        public int UID { get; set; }
        public string Message { get; set; }
    }


}