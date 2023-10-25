using System.Net;
using BmxApi.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;

namespace BmxApi.Middlewares;

public static class ExceptionMiddlewareExtensions
{
    // Method to configure exception handler
    public static void ConfigureExceptionHandler(this IApplicationBuilder app)
    {
        if (app is null)
        {
            throw new ArgumentNullException(nameof(app));
        }

        app.UseMiddleware<ExceptionMiddleware>();
    }

    // Method to ErrorDetails object from ActionContext
    public static ErrorDetails ConstructErrorMessages(this ActionContext context)
    {
        var errors = context.ModelState.Values.Where(v => v.Errors.Count >= 1)
            .SelectMany(v => v.Errors)
            .Select(v => v.ErrorMessage)
            .ToList();

        return new ErrorDetails
        {
            ErrorType = ReasonPhrases.GetReasonPhrase((int)HttpStatusCode.BadRequest),
            Errors = errors
        };
    }

    // Method to handle exception
    public static async Task HandleExceptionAsync(this HttpContext httpContext, Exception exception)
    {
        if (httpContext is null)
        {
            throw new ArgumentNullException(nameof(httpContext));
        }

        if (exception is null)
        {
            throw new ArgumentNullException(nameof(exception));
        }

        httpContext.Response.ContentType = "application/json";

        httpContext.Response.StatusCode = exception switch
        {
            BadRequestException => (int)HttpStatusCode.BadRequest,
            InternalServerErrorException => (int)HttpStatusCode.InternalServerError,
            NotFoundException => (int)HttpStatusCode.NotFound,
            _ => (int)HttpStatusCode.InternalServerError
        };

        var errorDetails = new ErrorDetails
        {
            ErrorType = exception.GetType().Name,
            Errors = new List<string> { exception.Message }
        };

        await httpContext.Response.WriteAsync(errorDetails.ToString());
    }
}