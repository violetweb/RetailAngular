using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace App.Web4.Helpers
{

   
        public static class AntiForgeryExtension
        {
            public static string RequestVerificationToken(this HtmlHelper helper)
            {
                return String.Format("request-verification-token={0}", GetTokenHeaderValue());
            }

            private static string GetTokenHeaderValue()
            {
                string cookieToken, formToken;
                System.Web.Helpers.AntiForgery.GetTokens(null, out cookieToken, out formToken);
                return cookieToken + ":" + formToken;
            }
        }
   
}