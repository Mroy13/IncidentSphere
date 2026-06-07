using System.Text.Json;
using IncidentSphere.StreamService.Shared.Utilities;

namespace IncidentSphere.StreamService.Shared.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (AppException ex)
        {
            context.Response.StatusCode = ex.StatusCode;
            context.Response.ContentType = "application/json";

            var response = ApiResponse<object>.FailureResponse(
                ex.Message,
                ex.Errors);

            await context.Response.WriteAsync(
                JsonSerializer.Serialize(response));
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = 500;
            context.Response.ContentType = "application/json";

            var response = ApiResponse<object>.FailureResponse(
                "Internal server error");

            await context.Response.WriteAsync(
                JsonSerializer.Serialize(response));
        }
    }
}