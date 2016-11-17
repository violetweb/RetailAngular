// --------------------------------------------------------------------------------------------------------------------
// <copyright file="RouteConfig.cs" company="Microsoft">
//   Copyright © 2015 Microsoft
// </copyright>
// --------------------------------------------------------------------------------------------------------------------
using System.Web.Routing;
using System.Web;
using System.Web.Mvc;
using App.Web4.Routing;


namespace App.Web4.Routes
{
   

    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
           

          
           routes.Add("Default", new DefaultRoute());
           
          
        }
    }
}
