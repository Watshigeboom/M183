using System.Web;
using System.Web.Mvc;

namespace TUT10_Database_XSS_Injection
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
