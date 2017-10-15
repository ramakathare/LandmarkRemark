using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;
using System.Web.Http.Controllers;
using System.Web.Http.Tracing;
using System.Web.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.ExceptionHandling;
using System.ComponentModel.DataAnnotations;
using System.Net.Http;
using System.Net;
using NLog;

namespace LandmarkRemark.API.NLogger
{
    /// <summary>
    /// An exception filter attribute that can be used to handle exceptions at action level
    /// </summary>
    public class ApplicationLevelExceptionHandlingFilterAttribute : ExceptionFilterAttribute
    {
        Logger logger = LogManager.GetCurrentClassLogger();
        public override void OnException(HttpActionExecutedContext context)
        {
            logger.Error(context.Exception.ToString());
        }
    }
    
}