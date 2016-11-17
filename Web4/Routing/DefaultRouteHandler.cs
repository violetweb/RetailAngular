// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DefaultRouteHandler.cs" company="Microsoft">
//   Copyright © 2015 Microsoft
// </copyright>
// --------------------------------------------------------------------------------------------------------------------


using System;
using System.Web;
using System.Web.Routing;
using System.Web.WebPages;

namespace App.Web4.Routing
{
 
  
    public class DefaultRouteHandler : IRouteHandler
    {

        
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            // Use cases:
            //     ~/            -> ~/views/index.cshtml
            //     ~/about       -> ~/views/about.cshtml or ~/views/about/index.cshtml
            //     ~/views/about -> ~/views/about.cshtml
            //     ~/views/login -> ~/views/login.cshtml
            //     ~/xxx         -> ~/views/404.cshtml
           
            var filePath = requestContext.HttpContext.Request.AppRelativeCurrentExecutionFilePath;

            if (filePath == "~/")
            {
                filePath = "~/views/index.cshtml";
                
                              
            }
            else
            {

              
                    if (!filePath.StartsWith("~/views/", StringComparison.OrdinalIgnoreCase))
                    {
                        filePath = filePath.Insert(2, "views/");
                    }

                    if (!filePath.EndsWith(".cshtml", StringComparison.OrdinalIgnoreCase))
                    {
                        filePath = filePath += ".cshtml";
                    }

                
            
            }
      
            var handler = WebPageHttpHandler.CreateFromVirtualPath(filePath); // returns NULL if .cshtml file wasn't found

            if (handler == null)
            {
                //requestContext.RouteData.DataTokens.Add("templateUrl", "/views/404");
                handler = WebPageHttpHandler.CreateFromVirtualPath("~/views/index.cshtml");
            }
            else
            {
                requestContext.RouteData.DataTokens.Add("templateUrl", filePath.Substring(1, filePath.Length - 8));
            }
           
            return handler;
         
        }
    }
}
