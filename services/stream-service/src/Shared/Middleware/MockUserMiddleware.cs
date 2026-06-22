using IncidentSphere.StreamService.Models;

namespace IncidentSphere.StreamService.Shared.Middleware;

public class MockUserMiddleware
{
    private readonly RequestDelegate _next;

    public MockUserMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        context.Items["User"] = new UserContext
        {
            UserId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
            TenantId = Guid.Parse("22222222-2222-2222-2222-222222222222"),
            Name = "Incident Commander"
        };

        await _next(context);
    }
}