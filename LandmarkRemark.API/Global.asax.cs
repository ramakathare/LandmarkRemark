﻿using LandmarkRemark.API.NLogger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Tracing;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace LandmarkRemark.API
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //Add application exception logging filter to the Global Configuration.
            //This will make sure that every acction will have this filter applied
            GlobalConfiguration.Configuration.Filters.Add(new ApplicationLevelExceptionHandlingFilterAttribute());
        }
    }
}
