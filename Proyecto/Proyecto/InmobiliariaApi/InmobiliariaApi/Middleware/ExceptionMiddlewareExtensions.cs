using InmobiliariaApi.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Net;

namespace InmobiliariaApi.Middleware;

/// <summary>
/// Extend the handler to capture the Exceptions
/// </summary>
public static class ExceptionMiddlewareExtensions
{
    /// <summary>
    /// Get MVC BadRequest error Messages
    /// </summary>
    /// <param name="context">Current Action Context</param>
    /// <returns>The Error Details</returns>
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

    /// <summary>
    /// Handler the Exception and create a valid HttpResponse
    /// </summary>
    /// <param name="context">Current Http Context</param>
    /// <param name="exception">Exception Catched</param>
    public static Task HandleExceptionAsync(this HttpContext context, Exception exception)
    {
        var httpStatusCode = GetStatusResponse(exception);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)httpStatusCode;

        var errors = new List<string>() { exception.Message };
        var innerException = exception;
        do
        {
            innerException = innerException.InnerException;
            if (innerException != null)
            {
                errors.Add(innerException.Message);
            }
        }
        while (innerException != null);

        var errorDetails = new ErrorDetails()
        {
            ErrorType = ReasonPhrases.GetReasonPhrase(context.Response.StatusCode),
            Errors = errors
        };

        return context.Response.WriteAsync(errorDetails.ToString());
    }

    /// <summary>
    /// Allow to enable the Exception Middleware as service
    /// </summary>
    /// <param name="builder">Builder object to configure the service</param>
    /// <returns>The object to use in the Startup</returns>
    public static IApplicationBuilder UseExceptionMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ExceptionMiddleware>();
    }

    /// <summary>
    /// Get the satus Code Response byt the Exception Type
    /// </summary>
    /// <param name="exception">Exception to handler</param>
    /// <returns>The HttpStatus Code</returns>
    private static HttpStatusCode GetStatusResponse(Exception exception)
    {
        var nameOfException = exception?.GetType()?.BaseType?.Name ?? string.Empty;

        if (nameOfException.Equals("BusinessException"))
        {
            nameOfException = exception?.GetType()?.Name;
        }

        return nameOfException switch
        {
            // Bad Request
            nameof(BadRequestException) => HttpStatusCode.BadRequest,

            // Not Found
            nameof(NotFoundException) => HttpStatusCode.NotFound,

            // Internal Server Error
            nameof(InternalServerErrorException) => HttpStatusCode.InternalServerError,

            // Default
            _ => HttpStatusCode.InternalServerError
        };
    }
}