// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Global.asax.cs" company="Microsoft">
//   Copyright © 2015 Microsoft
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

using System.Web;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Http;
using App.Web4.Routes;

namespace App.Web4
{
 

    public class Application : HttpApplication
    {
        protected void Application_Start()
        {

                      
            GlobalConfiguration.Configure(WebApiConfig.Register);         
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            
         
        }
    }
}
