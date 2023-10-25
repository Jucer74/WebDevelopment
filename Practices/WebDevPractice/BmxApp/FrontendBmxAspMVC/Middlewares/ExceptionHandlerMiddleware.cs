using FrontendBmxAspMVC.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Newtonsoft.Json;

namespace FrontendBmxAspMVC.Middlewares;

public class ExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionHandlerMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var statusCode = StatusCodes.Status500InternalServerError; // Default status code

        if (exception is HttpRequestException)
        {
            statusCode = StatusCodes.Status401Unauthorized; // Unauthorized status code
            var routeData = context.GetRouteData();
            var actionContext = new ActionContext(context, routeData, new ControllerActionDescriptor());
            var result = new ViewResult
            {
                ViewName = "Error",
                ViewData = new ViewDataDictionary(new EmptyModelMetadataProvider(), new ModelStateDictionary())
                {
                    Model = new ErrorViewModel
                    {
                        RequestId = "AutorizationError",
                        ShowRequestId = true,
                        ErrorMessage = "You are not authorized to access this resource"
                    }
                }
            };
            context.Response.StatusCode = statusCode;
            return result.ExecuteResultAsync(actionContext);
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = statusCode;

        var response = new { message = "Not Authorized" };
        var jsonResponse = JsonConvert.SerializeObject(response);

        return context.Response.WriteAsync(jsonResponse);
    }
}