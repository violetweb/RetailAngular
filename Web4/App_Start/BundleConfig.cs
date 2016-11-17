// --------------------------------------------------------------------------------------------------------------------
// <copyright file="BundleConfig.cs" company="Microsoft">
//   Copyright © 2015 Microsoft
// </copyright>
// --------------------------------------------------------------------------------------------------------------------

using System.Web;
using System.Web.Optimization;


namespace App.Web4
{

    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/content/css/app").Include("~/content/app.css",
                "~/Content/components.css",
                "~/Content/core.css",
                "~/Content/forms.css",
                "~/Content/skins.css",
                "~/Content/xenon.css",
                "~/Content/fonts/fontawesome/css/font-awesome.min.css",
                "~/Content/angular-csp.css",
                "~/Content/glasses.css",
                "~/Content/custom.css",                             
                "~/Content/xenon.css"));

            //MAKE SURE TO LOAD JQUERY BEFORE ANGULAR !!!
            bundles.Add(new ScriptBundle("~/js/jquery").Include(
                "~/scripts/vendor/jquery/jquery-2.0.3.min.js",
                "~/scripts/vendor/jquery/jquery.validate.min.js",                                                 
                "~/scripts/vendor/jquery/jquery.validate.unobtrusive.min.js"               
               ));


            bundles.Add(new ScriptBundle("~/js/other").Include(
                          "~/Content/js/TweenMax.min.js",
                          "~/scripts/vendor/oc-lazyload/ocLazyLoad.min.js"));

            bundles.Add(new ScriptBundle("~/js/angular").Include(
                "~/scripts/vendor/angular/angular-1.3.14.min.js",               
                "~/scripts/vendor/angular/angular-touch.min.js",
                "~/scripts/vendor/angular/angular-ui-router.min.js",
                
                "~/scripts/vendor/angular/angular-route.min.js",
                "~/scripts/vendor/angular/angular-loader.min.js",
                "~/scripts/vendor/angular/angular-cookies.min.js",               
                "~/scripts/vendor/angular/angular-resource.min.js",
                "~/scripts/vendor/angular/angular-local-storage.min.js",
                "~/scripts/vendor/angular/angular-touch.min.js",
                "~/Scripts/bootstrap.min.js",
                "~/Scripts/vendor/jquery/ui-bootstrap-tpls-0.11.2.min.js",
                "~/Content/js/wysihtml5/wysihtml5-angular.js",
                "~/scripts/vendor/angular/angular-animate.min.js"
                ));

     

            bundles.Add(new ScriptBundle("~/js/app").Include(
               "~/scripts/filters.js",
               "~/scripts/custom.js",
               "~/scripts/services.js",
               "~/scripts/factory.js",
               "~/scripts/directives.js",
               "~/scripts/controllers.js",
               "~/scripts/app.js"
              ));
        }
    }
}
