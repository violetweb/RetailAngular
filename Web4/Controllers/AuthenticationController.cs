using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using RetailDB;
using App.Web4.Models;
using Newtonsoft.Json;
using System.Security;
using System.Web.Helpers;


namespace App.Web4.Controllers
{

    public class AuthenticationController : ApiController
    {

        private BrainsEntities db = new BrainsEntities();

      
        [Route("authenticate")]
        public IHttpActionResult Authenticate(AuthenticateModel viewModel)
        {

           /*(int exists = db.RetailUsers
                      .Where(b => b.Username == "Admin" && b.Password=="daroom88")
                      .Count();
            */
            
            
           // var users = db.RetailUsers.Where(b => b.Username == viewModel.Username && b.Password == viewModel.Password);
        
            var users = (from u in db.RetailUsers
                where u.Username==viewModel.Username
                && u.Password==viewModel.Password                
                select new  { 
                     RetailAccess = u.RetailAccess,
                     UID = u.UID,
                     Success = true,
                     Message = "Successfully logged into your account."
                 }
                 
            ).ToList(); 

            if (users.Count()<1)
            {   
              
                var result =  new { success = false, message = "User code or password is incorrect" };    
                
                return Ok(result);
               
            } else{                
               return Ok(users);
            }

            //return Ok(new { success = true });
        }
    }
    
   


}