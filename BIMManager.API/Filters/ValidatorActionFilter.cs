using BIMManager.API.Helpers;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BIMManager.API.Filters
{
    public class ValidatorActionFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (!filterContext.ModelState.IsValid)
            {
                filterContext.Result = new ValidationFailedResult(filterContext.ModelState);
            }
        }

        public void OnActionExecuted(ActionExecutedContext filterContext) { }
    }
}
