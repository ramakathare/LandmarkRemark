using System.Web;
using System.Web.Mvc;

namespace LandmarkRemark.API
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            // refer for more explanation http://www.c-sharpcorner.com/UploadFile/8a67c0/exception-handing-using-handleerror-attribute-in-Asp-Net-mvc/
            filters.Add(new HandleErrorAttribute());
        }
    }
}
